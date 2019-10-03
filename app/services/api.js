/**
 * Inicio de sesión del usuario-pacient
 * @param {*} nDocument 
 * @param {*} password 
 */
export function signIn(nDocument,password){ 
    return fetch(`https://api-rest-botic.herokuapp.com/api/patiens/login`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ nDocument, password })
    });
}

