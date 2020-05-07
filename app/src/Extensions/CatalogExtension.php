<?php

namespace App\Web\Extension;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Control\HTTPRequest;
use TractorCow\Fluent\State\FluentState;
use Leochenftw\Util\CacheHandler;

class CatalogExtendsion extends DataExtension
{
    public function getData(&$data)
    {
        $locale = Injector::inst()->get(HTTPRequest::class)->getSession()->get('UserPreferredLang');
        FluentState::singleton()->setLocale($locale);
        
        if (empty($cached)) {

            $data = array_merge($data, $this->owner->getCatalogData());

            CacheHandler::save("page.{$this->owner->ID}.$locale", $data, 'PageData');
        }
    }
}
