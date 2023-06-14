<#import "template.ftl" as layout>
<@layout.registrationLayout displayMessage=false; section>
    <#if section = "header">
    <#elseif section = "form">
    <div id="kc-info-message">

        <p class="login-box-msg">
            <#if messageHeader??>
            ${messageHeader}
            <#else>
            ${message.summary}
            </#if>
        </p>

        <p class="instruction">
            <#if messageHeader??>
            ${message.summary}
            </#if>
            <#if requiredActions??>
                <#list requiredActions>: 
                <b>
                    <#items as reqActionItem>
                        ${kcSanitize(msg("requiredAction.${reqActionItem}"))?no_esc}<#sep>, 
                    </#items>
                </b>
                </#list>
            </#if></p>
        <#if skipLink??>
        <#else>
            <#if pageRedirectUri?has_content>
                <p><a class="btn btn-primary btn-block" href="${pageRedirectUri}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
            <#elseif actionUri?has_content>
                <p><a class="btn btn-primary btn-block" href="${actionUri}">${kcSanitize(msg("proceedWithAction"))?no_esc}</a></p>
            <#elseif (client.baseUrl)?has_content>
                <p><a class="btn btn-primary btn-block" href="${client.baseUrl}">${kcSanitize(msg("backToApplication"))?no_esc}</a></p>
            </#if>
        </#if>
    </div>
    </#if>
</@layout.registrationLayout>