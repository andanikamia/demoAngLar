@component('mail::message')
# Introduction

Change Password Request

@component('mail::button', ['url' => 'http://localhost:4200/response-password-reset?token='.$token])
Change Password
@endcomponent

Thanks,<br>
{{ config('app.name') }}
@endcomponent
