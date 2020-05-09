<?php

namespace App\Web\Extension;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Control\HTTPRequest;
use TractorCow\Fluent\State\FluentState;

class CatalogExtendsion extends DataExtension
{
    public function getData(&$data)
    {
        $locale = Injector::inst()->get(HTTPRequest::class)->getSession()->get('UserPreferredLang');
        FluentState::singleton()->setLocale($locale);

        $data = array_merge($data, $this->owner->getCatalogData());
    }
}
