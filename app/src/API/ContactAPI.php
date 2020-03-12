<?php

namespace App\Web\API;
use Leochenftw\Restful\RestfulController;
use SilverStripe\Security\SecurityToken;
use App\Web\Model\ContactSubmission;
use SilverStripe\Security\Member;
use Leochenftw\Util\reCaptcha;
use Leochenftw\Util;

class ContactAPI extends RestfulController
{
    /**
     * Defines methods that can be called directly
     * @var array
     */
    private static $allowed_actions = [
        'post'  =>  true
    ];

    public function post($request)
    {
        if (Util::check_csrf($request)) {
            // if ($g_resp = $request->postVar('recap_resp')) {
            //     if (reCaptcha::verify($g_resp)) {
                    $name       =   $request->postVar('name');
                    $title      =   $request->postVar('title');
                    $content    =   $request->postVar('content');
                    $email      =   $request->postVar('email');

                    $submission             =   ContactSubmission::create();
                    $submission->Title      =   $title;
                    $submission->Content    =   $content;
                    $submission->Name       =   $name;
                    $submission->Email      =   $email;
                    $submission->write();
                    $submission->send_email();

                    return [
                        'code'      =>  200,
                        'message'   =>  'Thank you for your contact! We will get back to you shortly!'
                    ];
            //     }
            //
            //     return $this->httpError(400, 'reCaptcha failed. Please try again!');
            // }
        }

        return $this->httpError(400, 'Missing CSRF token!');
    }
}
