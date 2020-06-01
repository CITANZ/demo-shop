<?php

namespace Cita\eCommerce\Controller;

use SilverStripe\i18n\i18n;

class ZhCart extends Cart
{
    protected function handleAction($request, $action)
    {
        i18n::set_locale($this->PreferredLang);
        return parent::handleAction($request, $action);
    }
}
