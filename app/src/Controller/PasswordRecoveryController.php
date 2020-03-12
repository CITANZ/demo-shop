<?php

namespace App\Web\Controller;
use PageController;
use App\Web\Layout\HomePage;
use Leochenftw\Debugger;
use SilverStripe\Security\Member;
use SilverStripe\Security\IdentityStore;
use SilverStripe\Core\Injector\Injector;
use SilverStripe\Control\HTTPRequest;

/**
 * Description
 *
 * @package silverstripe
 * @subpackage mysite
 */
class PasswordRecoveryController extends PageController
{
    public function index(HTTPRequest $request)
    {
        if ($member = Member::get()->byID($request->getVar('id'))) {
            if ($member->ValidationKey == $request->getVar('token')) {
                $member->ValidationKey  =   null;
                $member->write();
                Injector::inst()->get(IdentityStore::class)->logIn($member, true);
                return parent::index($request);
            }

            return $this->httpError(400, 'Invalid password reset token');
        }

        return parent::index();
    }

    public function getData()
    {
        return [];
    }
}
