
/**
 * Set the API key
 * @param {string} ochnkey - The API key
 */

let ochnkey = '082f34176f42a859i85cc3b1';

(function (d, s, id) {
    let js, ojs = d.getElementsByTagName(s)[0];

    if (d.getElementById(id)) { return; }

    js = d.createElement(s); js.id = id; js.async = !0;

    js.src = "https://app-premiumauto.footprintsforretail.com/jsapi/omnichannel.js";

    ojs.parentNode.insertBefore(js, ojs);

}(document, 'script', 'omnichanneltrack'));

/**
 * Initialization function 
 * ocnh.init()   - Initialized the F-AI omnichannel Js library
 * ochn.send()   - Tracking the search of the page
 */

async function ochntrack() {
    if (ochn.init) ochn.init();
    if (ochn.send) ochn.send("action", "visit");
    let siteUrl = window.location.href
    const queryString = siteUrl.split('?')[1];
    const queryParams = queryString?.split('&');
    const params = {};
    queryParams?.forEach(param => {
      const [key, value] = param.split('=');
      params[key] = value;
  });

    const email = params?.email;
    let body = {email:email}
    if(email){
        let populatedData = ochn.prepopulate(body);
        const event = new CustomEvent('populatedData', { detail: populatedData });
        window.dispatchEvent(event);
    }
    
}

