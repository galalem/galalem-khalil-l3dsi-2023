<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=!messagesPerField.existsError('password','password-confirm'); section>
    <#if section = "header">
        ${msg("updatePasswordTitle")}
    <#elseif section = "form">
        <form id="kc-passwd-update-form" class="${properties.kcFormClass!}" action="${url.loginAction}" method="post">
            <input type="text" id="username" name="username" value="${username}" autocomplete="username"
                   readonly="readonly" style="display:none;"/>
            <input type="password" id="password" name="password" autocomplete="current-password" style="display:none;"/>

            <div class="input-group">
                <input type="password" id="password-new" name="password-new" class="form-control"
                        autofocus autocomplete="new-password"
                        placeholder="${msg("passwordNew")}"
                        aria-invalid="<#if messagesPerField.existsError('password','password-confirm')>true</#if>"
                />
            </div>
            <div class="mb-3">
                <#if messagesPerField.existsError('password')>
                    <span id="input-error-password" class="text-danger text-small" aria-live="polite">
                        ${kcSanitize(messagesPerField.get('password'))?no_esc}
                    </span>
                </#if>
            </div>

            <div class="input-group">
                <input type="password" id="password-confirm" name="password-confirm"
                        class="form-control"
                        autocomplete="new-password"
                        placeholder="${msg("passwordConfirm")}"
                        aria-invalid="<#if messagesPerField.existsError('password-confirm')>true</#if>"
                />
            </div>
            <div class="mb-3">
                <#if messagesPerField.existsError('password-confirm')>
                    <span id="input-error-password-confirm" class="text-danger text-small" aria-live="polite">
                        ${kcSanitize(messagesPerField.get('password-confirm'))?no_esc}
                    </span>
                </#if>
            </div>


            <div class="input-group">
                <div id="kc-form-options">
                    <div class="icheck-primary mb-3 d-flex align-items-center">
                        <input class="mr-1" type="checkbox" id="logout-sessions" name="logout-sessions" value="on" checked>
                        <label for="logout-sessions" style="font-weight: normal; margin: 0;">
                            ${msg("logoutOtherSessions")}
                        </label>
                    </div>
                </div>
            </div>

            <div id="kc-form-buttons">
                <#if isAppInitiatedAction??>
                <div class="row">
                    <div class="col-6">
                        <input class="btn btn-primary btn-block" type="submit" value="${msg("doSubmit")}" />
                    </div>
                    <div class="col-6">
                        <button class="btn btn-outline-danger btn-block" type="submit" name="cancel-aia" value="true" />${msg("doCancel")}</button>
                    </div>
                </div>
                <#else>
                    <input class="btn btn-primary btn-block" type="submit" value="${msg("doSubmit")}" />
                </#if>
            </div>
        </form>
    </#if>
</@layout.registrationLayout>