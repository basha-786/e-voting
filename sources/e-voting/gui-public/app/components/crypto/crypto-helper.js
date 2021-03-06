/******************************************************************************
 * e-voting system                                                            *
 * Copyright (C) 2016 DSX Technologies Limited.                               *
 *                                                                            *
 * This program is free software; you can redistribute it and/or modify       *
 * it under the terms of the GNU General Public License as published by       *
 * the Free Software Foundation; either version 2 of the License, or          *
 * (at your option) any later version.                                        *
 *                                                                            *
 * This program is distributed in the hope that it will be useful,            *
 * but WITHOUT ANY WARRANTY; without even the implied                         *
 * warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.           *
 * See the GNU General Public License for more details.                       *
 *                                                                            *
 * You can find copy of the GNU General Public License in LICENSE.txt file    *
 * at the top-level directory of this distribution.                           *
 *                                                                            *
 * Removal or modification of this copyright notice is prohibited.            *
 *                                                                            *
 ******************************************************************************/

'use strict';

angular
  .module('e-voting.crypto', [])
  .service('cryptoHelper', function() {
    var crypto = window.crypto || window.msCrypto,
      algorithm = "RSASSA-PKCS1-v1_5";

    return {
      signData: signData,
      importKey: importKey
    };

    function convertStringToArrayBufferView(str) {
      var bytes = new Uint8Array(str.length);
      for (var iii = 0; iii < str.length; iii++) {
        bytes[iii] = str.charCodeAt(iii);
      }
      return bytes;
    }
    function _base64ToArrayBuffer(base64) {
      var binary_string =  window.atob(base64);
      var len = binary_string.length;
      var bytes = new Uint8Array( len );
      for (var i = 0; i < len; i++)        {
        bytes[i] = binary_string.charCodeAt(i);
      }
      return bytes.buffer;
    }
    function _arrayBufferToBase64( buffer ) {
      var binary = '';
      var bytes = new Uint8Array( buffer );
      var len = bytes.byteLength;
      for (var i = 0; i < len; i++) {
        binary += String.fromCharCode( bytes[ i ] );
      }
      return window.btoa( binary );
    }

    function importKey (key, importKeyComplete) {
      crypto.subtle.importKey("pkcs8", _base64ToArrayBuffer(key), {name: algorithm, hash: {name: "SHA-1"}}, true, ["sign"]).then(function(result){
        importKeyComplete(result);
      }, function(e){
        console.log(e);
      });
    }

    function signData (key, data, signDataComplete) {
      var encrypt_promise;

      importKey(key, function(private_key_object) {
        encrypt_promise = crypto.subtle.sign({name: algorithm}, private_key_object, convertStringToArrayBufferView(data));
        encrypt_promise.then(
          function (result_signature) {
            signDataComplete(_arrayBufferToBase64(result_signature));
          },
          function (e) {
            console.log(e);
          }
        );
      });
    }
  });