<?php

namespace App\Web\Extension;
use SilverStripe\ORM\DataExtension;

/**
 * @file SiteConfigExtension
 *
 * Extension to provide Open Graph tags to site config.
 */
class SiteConfigExtension extends DataExtension
{
    public function getData()
    {
        return [
            'title'     =>  $this->owner->Title,
            'tagline'   =>  $this->owner->Tagline,
            'logo'      =>  $this->owner->Logo()->getData('ScaleWidth', 128)
        ];
    }
}
