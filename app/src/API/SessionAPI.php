<?php

namespace App\Web\API;
use Leochenftw\Restful\RestfulController;
use SilverStripe\Security\SecurityToken;
use SilverStripe\Security\Member;
use SilverStripe\i18n\i18n;

class SessionAPI extends RestfulController
{
    /**
     * Defines methods that can be called directly
     * @var array
     */
    private static $allowed_actions = [
        'get' => true,
        'post' => true
    ];

    public function get($request)
    {
        return  [
            'csrf'      =>  SecurityToken::inst()->getSecurityID(),
            'member'    =>  Member::currentUser() ? Member::currentUser()->getData() : null
        ];
    }

    public function post(&$request)
    {
        if ($lang = $request->postVar('lang')) {
            $this->request->getSession()->set('UserPreferredLang', $lang);
            i18n::set_locale($lang);
            return $lang;
        }

        return $this->httpError(404);
    }
}
