/**
 *
 * Copyright 2017 Observational Health Data Sciences and Informatics
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Company: Odysseus Data Services, Inc.
 * Product Owner/Architecture: Gregory Klebanov
 * Authors: Pavel Grafkin, Alexander Saltykov, Vitaly Koulakov, Anton Gackovka, Alexandr Ryabokon, Mikhail Mironov
 * Created: December 13, 2016
 *
 */

import Cookies from 'js-cookie';

const LS_TOKEN_KEY = 'Arachne-Auth-Token';
const COOKIE_TOKEN_KEY = 'Arachne-Auth-Token';

class Auth {

  static setToken(token) {
    // For ajax
    localStorage.setItem(LS_TOKEN_KEY, token);
    // For file downloading
    Cookies.set(COOKIE_TOKEN_KEY, token, { expires: 365, path: '/' });
  }

  static getToken() {
    return localStorage.getItem(LS_TOKEN_KEY);
  }

  static clearToken() {
    localStorage.removeItem(LS_TOKEN_KEY);
    Cookies.remove(COOKIE_TOKEN_KEY, { path: '/' });
  }

}

export default Auth;
export {
  LS_TOKEN_KEY,
  COOKIE_TOKEN_KEY,
};
