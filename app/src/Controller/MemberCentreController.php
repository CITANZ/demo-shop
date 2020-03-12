<?php

namespace App\Web\Layout;
use SilverStripe\Control\HTTPRequest;
use PageController;
use SilverStripe\Security\Member;
use SilverStripe\Versioned\Versioned;
/**
 * Description
 *
 * @package silverstripe
 * @subpackage mysite
 */
class MemberCentreController extends PageController
{
    public function index(HTTPRequest $request)
    {
        return parent::index($request);
    }

    public function getData()
    {
        return [];
    }
}
