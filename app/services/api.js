/**
 * Inicio de sesión del usuario-pacient
 * @param {*} nDocument 
 * @param {*} password 
 */
export function signIn(nDocument,password){ 
    return fetch(`http://localhost:8080/api/patients/login`,{ 
        method: 'POST', 
        headers: { 'Content-Type':'application/json', },
        body: JSON.stringify({ nDocument, password })
    });
}

