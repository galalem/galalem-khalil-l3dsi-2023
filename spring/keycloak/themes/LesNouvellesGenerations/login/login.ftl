<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('username','password') displayInfo=realm.password && realm.registrationAllowed && !registrationDisabled??; section>
    <#if section = "header">
        ${msg("loginAccountTitle")}
    <#elseif section = "form">
    <div id="kc-form">
      <div id="kc-form-wrapper">        
        <#if realm.password>
            <form id="kc-form-login" onsubmit="login.disabled = true; return true;" action="${url.loginAction}" method="POST">
                <#if !usernameHidden??>
                    <div class="input-group">
                        <input tabindex="1" id="username" class="form-control" name="username" value="${(login.username!'')}"  type="text" autofocus autocomplete="off"
                               placeholder="<#if !realm.loginWithEmailAllowed>${msg("username")}<#elseif !realm.registrationEmailAsUsername>${msg("usernameOrEmail")}<#else>${msg("email")}</#if>"
                               aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"/>
                        <div class="input-group-append">
                            <div class="input-group-text">
                                <i class="fas fa-envelope" style="width: 1.2em;"></i>
                            </div>
                        </div>
                    </div>
                    <div class="mb-3">
                        <#if messagesPerField.existsError('username','password')>
                            <span id="input-error" class="text-danger text-small" aria-live="polite">
                                    ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                            </span>
                        </#if>
                    </div>
                </#if>

                <div class="input-group">
                    <input tabindex="2" id="password" class="form-control" name="password" type="password" autocomplete="off"
                           placeholder="${msg("password")}" aria-invalid="<#if messagesPerField.existsError('username','password')>true</#if>"/>

                    <div class="input-group-append">
                        <div class="input-group-text">
                            <i class="fas fa-lock" style="width: 1.2em;"></i>
                        </div>
                    </div>

                </div>
                <div>
                <#if usernameHidden?? && messagesPerField.existsError('username','password')>
                    <span id="input-error" class="text-danger text-small" aria-live="polite">
                            ${kcSanitize(messagesPerField.getFirstError('username','password'))?no_esc}
                    </span>
                </#if>
                </div>

                <div class="mb-3 text-right text-small">
                <#if realm.resetPasswordAllowed>
                    <a tabindex="5" href="${url.loginResetCredentialsUrl}">${msg("doForgotPassword")}</a>
                </#if>
                </div>

                <div id="kc-form-buttons" class="input-group">
                    <input type="hidden" id="id-hidden-input" name="credentialId" <#if auth.selectedCredential?has_content>value="${auth.selectedCredential}"</#if>/>
                    <input tabindex="4" class="btn btn-primary btn-block" name="login" id="kc-login" type="submit" value="${msg("doLogIn")}"/>
                </div>

                <div class="input-group">
                    <div id="kc-form-options">
                    <#if realm.rememberMe && !usernameHidden??>
                        <div class="icheck-primary mt-1 d-flex align-items-center">
                        <#if login.rememberMe??>
                            <input class="mr-1" tabindex="3" id="rememberMe" name="rememberMe" type="checkbox" checked>
                        <#else>
                            <input class="mr-1" tabindex="3" id="rememberMe" name="rememberMe" type="checkbox">
                        </#if>
                            <label for="rememberMe" style="font-weight: normal; font-size: 0.85em; margin: 0;">
                                ${msg("rememberMe")}
                            </label>
                        </div>
                    </#if>
                    </div>
                </div>
            </form>
        </#if>
        </div>

    </div>
    <#elseif section = "info" >
        <#if realm.password && realm.registrationAllowed && !registrationDisabled??>
            <div id="kc-registration-container">
                <div id="kc-registration">
                    <span>${msg("noAccount")} <a tabindex="6"
                                                 href="${url.registrationUrl}">${msg("doRegister")}</a></span>
                </div>
            </div>
        </#if>
    <#elseif section = "socialProviders" >
        <#if realm.password && social.providers??>
            <div id="kc-social-providers" class="${properties.kcFormSocialAccountSectionClass!}">
                <hr/>
                <h4>${msg("identity-provider-login-label")}</h4>

                <ul class="${properties.kcFormSocialAccountListClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountListGridClass!}</#if>">
                    <#list social.providers as p>
                        <a id="social-${p.alias}" class="${properties.kcFormSocialAccountListButtonClass!} <#if social.providers?size gt 3>${properties.kcFormSocialAccountGridItem!}</#if>"
                                type="button" href="${p.loginUrl}">
                            <#if p.iconClasses?has_content>
                                <i class="${properties.kcCommonLogoIdP!} ${p.iconClasses!}" aria-hidden="true"></i>
                                <span class="${properties.kcFormSocialAccountNameClass!} kc-social-icon-text">${p.displayName!}</span>
                            <#else>
                                <span class="${properties.kcFormSocialAccountNameClass!}">${p.displayName!}</span>
                            </#if>
                        </a>
                    </#list>
                </ul>
            </div>
        </#if>
    </#if>

</@layout.registrationLayout>