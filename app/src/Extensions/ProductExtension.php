<?php

namespace App\Web\Extension;
use SilverStripe\ORM\DataExtension;
use Leochenftw\Util\CacheHandler;
use Leochenftw\Util;

class ProductExtension extends DataExtension
{
    public function getMiniData()
    {
        return array_merge($this->owner->getBaseData(), [
            'title'         =>  $this->owner->Title,
            'url'           =>  $this->owner->Link(),
            'discount_rate' =>  $this->owner->SpecialDiscountRate
        ]);
    }

    public function getTileData()
    {
        $data               =   $this->owner->getMiniData();
        $data['thumb']      =   $this->owner->Image()->getData('Fill', 320, 320);
        $data['excerpt']    =   Util::getWords(Util::preprocess_content($this->owner->ShortDesc), 32);
        return $data;
    }

    public function getCurrentPrice()
    {
        return !empty($this->owner->get_special_price()) ? $this->owner->get_special_price() : $this->owner->Price;
    }

    public function getCoreData()
    {
        $core = $this->owner->getMiniData();
        $core['brand'] = $this->owner->Brand()->exists() ? $this->owner->Brand()->getData() : null;
        $core['stock'] = $this->owner->StockCount;
        $core['short_desc'] = Util::preprocess_content($this->owner->ShortDesc);

        return $core;
    }

    public function getData(&$data)
    {
        $data = array_merge($data, $this->owner->getCoreData());

        $data['related_products'] = $this->owner->Related()->getTileData();
        $data['related_categories'] = $this->get_related_categories();
        $data['variants'] = $this->owner->hasVariants ? $this->owner->Variants()->getData() : [$this->getCoreData()];
        $data['top_sellers'] = $this->owner->get_top_sellers();
        $data['might_likes'] = $this->get_same_kind();
        $data['brand_siblings'] = $this->owner->Brand()->exists() ?
            $this->owner->Brand()->Products()->sort('RAND()')->limit(12)->getTileData() : null;
    }

    private function get_same_kind()
    {
        $products   =   [];
        $categories =   $this->owner->Categories();
        if ($categories->exists()) {
            $per_category   =   floor(12 / $categories->count());
            foreach ($categories as $category) {
                $prods      =   $category->Products()->sort("RAND()")->limit($per_category)->getTileData();
                $products   =   array_merge($products, $prods);
                if (count($products) >= 12) {
                    break;
                }
            }
        }

        return $products;
    }

    private function get_related_categories()
    {
        $categories =   $this->owner->Categories()->getData(false);
        $this->exclude_empty_category($categories);

        if ($this->owner->Parent()->exists()) {
            $catalog_link   =   rtrim($this->owner->Parent()->Link(), '/');
            foreach ($categories as &$category) {
                $category['url']    =   $catalog_link . '?category=' . $category['slug'];
            }
        }

        return [
            'list'  =>  $categories,
            'upper' =>  null
        ];
    }

    public function exclude_empty_category(&$array)
    {
        $list    =   [];
        foreach ($array as $item) {
            if ($item['count'] != 0) {
                $list[]  =   $item;
            }
        }

        $array   =   $list;
    }
}
