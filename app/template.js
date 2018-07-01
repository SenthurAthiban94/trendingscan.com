import './favicon.ico';
export default ({ markup, helmet }) => {
	return `<!doctype html>
            <html ${helmet.htmlAttributes.toString()}>
                <head>
                    <base href="/" />
                    ${helmet.title.toString()}
                    ${helmet.meta.toString()}
                    ${helmet.link.toString()}
                    <link rel="icon shortcut" href="/build/favicon.ico"/>
                    <link rel='stylesheet'type='text/css' href='https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css' crossorigin='anonymous'/>
                    <link rel="stylesheet" type="text/css" href="/build/styles.css"/>
                </head>
                <body ${helmet.bodyAttributes.toString()}>
                    <div style="min-width:100vw;min-height:100vh;position:fixed;background:#0000002e;"></div>
                    <div id="root">${markup}</div>
                    <script src="./build/client.js" async></script>
                    <script type="text/javascript">
                    window.fbAsyncInit = function() {
                        FB.init({
                            appId      : '462468354180027',
                            xfbml      : true,
                            version    : 'v3.0'
                        });
                        FB.AppEvents.logPageView();
                    };
                    
                    (function(d, s, id){
                        var js, fjs = d.getElementsByTagName(s)[0];
                        if (d.getElementById(id)) {return;}
                        js = d.createElement(s); js.id = id;
                        js.src = "https://connect.facebook.net/en_US/sdk.js";
                        fjs.parentNode.insertBefore(js, fjs);
                    }(document, 'script', 'facebook-jssdk'));
                    </script>
                </body>
            </html>`;
};