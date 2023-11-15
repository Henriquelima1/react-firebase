import { auth, db } from '../../firebaseConfig';
import { doc, addDoc, collection, query, onSnapshot, updateDoc, deleteDoc, where } from "firebase/firestore";

export const getPostsFirebase = async (setListaObjetos) => {
    try {
        const q = query(collection(db, 'manutencao'))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                placa: doc.data().placa,
                manutencao: doc.data().manutencao,
                tipo: doc.data().tipo,
                url: doc.data().url,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const getPostsUIDFirebase = async (uid, setListaObjetos) => {
    try {
        const colRef = collection(db, "manutencao");
        const q = query(colRef, where("uid", "==", uid))
        onSnapshot(q, (querySnapshot) => {
            setListaObjetos(querySnapshot.docs.map(doc => ({
                id: doc.id,
                placa: doc.data().placa,
                manutencao: doc.data().manutencao,
                tipo: doc.data().tipo,
                url: doc.data().url,
                usuario: doc.data().usuario,
                email: doc.data().email,
                uid: doc.data().uid
            })))
        })
    } catch (err) {
        throw err;
    }
}

export const deletePostFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'manutencao', objeto.id)
        await deleteDoc(postDocRef);
    } catch (err) {
        throw err;
    }
}

export const addPostFirebase = async objeto => {
    try {
        let ret = await addDoc(collection(db, 'manutencao'),
            {
                placa: objeto.placa,
                manutencao: objeto.manutencao,
                tipo: objeto.tipo,
                url: objeto.url,
                uid: objeto.uid,
                usuario: objeto.usuario,
                email: objeto.email
            }).then(function (docRef) {
                objeto = { ...objeto, id: docRef.id };
                return objeto;
            });
        return ret;
    } catch (err) {
        throw err;
    }
}

export const updatePostFirebase = async objeto => {
    try {
        const postDocRef = doc(db, 'manutencao', objeto.id)
        await updateDoc(postDocRef, {
            placa: objeto.placa,
            manutencao: objeto.manutencao,
            tipo: objeto.tipo,
            url: objeto.url,
            uid: objeto.uid,
            usuario: objeto.usuario,
            email: objeto.email
        })
    } catch (err) {
        throw err;
    }
}




