import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
export const auth = {
    adminLogin(to, from, next) {
        const existCookie = cookies.isKey('sessionAdmin');
        if (existCookie) {
            const cookieAdmin = cookies.get('sessionAdmin');
            if (cookieAdmin === null) {
                cookies.remove('sessionAdmin');
                next();
            } else {
                if (cookieAdmin === 'TF96581trnmjxsFT30145213985412MAKJHDYYAH5456YJG') {
                    next({ name: 'Dashboard' });
                } else {
                    cookies.remove('sessionAdmin');
                    next();
                }

            }
        } else {
            next();
        }



    },
    adminDashboard(to, from, next) {
        const existCookie = cookies.isKey('sessionAdmin');
        if (existCookie) {
            const cookieAdmin = cookies.get('sessionAdmin');
            if (cookieAdmin === null) {
                cookies.remove('sessionAdmin');
                next({ name: 'Login' });
            } else {
                if (cookieAdmin === 'TF96581trnmjxsFT30145213985412MAKJHDYYAH5456YJG') {
                    next();
                } else {
                    cookies.remove('sessionAdmin');
                    next({ name: 'Login' });
                }

            }
        } else {
            next({ name: 'Login' });
        }

    },
}