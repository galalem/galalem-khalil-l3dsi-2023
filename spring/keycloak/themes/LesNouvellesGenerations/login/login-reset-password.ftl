<#import "template.ftl" as layout>
<@layout.registrationLayout displayInfo=true displayMessage=!messagesPerField.existsError('username'); section>
    <#if section = "header">
        ${msg("emailForgotTitle")}
    <#elseif section = "form">
        <form id="kc-reset-password-form" action="${url.loginAction}" method="post">

            <div class="login-box-msg text-justify p-1 mb-4">
                <#if realm.duplicateEmailsAllowed>
                    ${msg("emailInstructionUsername")}
                <#else>
                    ${msg("emailInstruction")}
                </#if>
            </div>

            <div class="input-group">
                <input type="text" id="username" name="username" class="form-control" autofocus 
                    placeholder='<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>'
                    value="${(auth.attemptedUsername!'')}" 
                    aria-invalid="<#if messagesPerField.existsError('username')>true</#if>"/>
            </div>
            <div class="mb-3">
                <#if messagesPerField.existsError('username')>
                    <span id="input-error-username" class="text-danger text-small" aria-live="polite">
                        ${kcSanitize(messagesPerField.get('username'))?no_esc}
                    </span>
                </#if>
            </div>

            <div id="kc-form-buttons" class="input-group">
                <input class="btn btn-primary btn-block" type="submit" value="${msg("doSubmit")}"/>
            </div>
        </form>
    <#elseif section = "footer" >
        <div id="kc-form-options">
            <span>Pas besoin de ça? <a href="${url.loginUrl}">${kcSanitize(msg("backToLogin"))?no_esc}</a></span>
        </div>
    </#if>
</@layout.registrationLayout>