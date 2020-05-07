<?php

namespace App\Web\Extension;
use SilverStripe\ORM\DataExtension;
use SilverStripe\Forms\FieldList;

class VariantExtension extends DataExtension
{
    public function getBarcode()
    {
        return $this->SKU;
    }
}
