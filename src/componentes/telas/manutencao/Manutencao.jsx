import { useState, useEffect } from "react";
import PostsContext from "./PostsContext";
import Tabela from "./Tabela";
import Form from "./Form";
import Carregando from "../../comuns/Carregando";
import { auth } from '../../../firebaseConfig';
import { useAuthState } from "react-firebase-hooks/auth";
import { deletePostFirebase, addPostFirebase, updatePostFirebase, getPostsUIDFirebase } from '../../servicos/PostsService';
import { Navigate } from "react-router-dom";

function Manutencao() {

    const [user, loading, error] = useAuthState(auth);

    const [alerta, setAlerta] = useState({ status: "", message: "" });
    const [listaObjetos, setListaObjetos] = useState([]);
    const [editar, setEditar] = useState(false);
    const [objeto, setObjeto] = useState({
        id: "", placa: "", manutencao: "", tipo: "", url: "",
        uid: user?.uid, usuario: user?.displayName, email: user?.email
    });
    const [carregando, setCarregando] = useState(true);
    const [abreDialogo, setAbreDialogo] = useState(false);

    const novoObjeto = () => {
        setEditar(false);
        setAlerta({ status: "", message: "" });
        setObjeto({
            id: "", placa: "", manutencao: "", tipo: "", url: "",
            uid: user?.uid, usuario: user?.displayName, email: user?.email
        });
        setAbreDialogo(true)
    }

    const editarObjeto = async (objeto) => {
        setObjeto(objeto);
        setAbreDialogo(true);
        setEditar(true);
        setAlerta({ status: "", message: "" });
    }

    const acaoCadastrar = async e => {
        e.preventDefault();
        if (editar) {
            try {
                await updatePostFirebase(objeto);
                setAlerta({ status: "success", message: "Manutenção atualizada com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao atualizar o Manutenção:" + err });
            }
        } else { // novo 
            try {
                setObjeto(await addPostFirebase(objeto));
                setEditar(true);
                setAlerta({ status: "success", message: "Manutenção prgramada com sucesso" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao criar nova Manutenção:" + err });
            }
        }
    }

    const handleChange = (e) => {
        const name = e.target.name;
        const value = e.target.value;
        setObjeto({ ...objeto, [name]: value });
    }

    const remover = async (objeto) => {
        if (window.confirm("Remover este objeto?")) {
            try {
                deletePostFirebase(objeto);
                setAlerta({ status: "success", message: "Manutenção removida com sucesso!" });
            } catch (err) {
                setAlerta({ status: "error", message: "Erro ao  remover: " + err });
            }
        }
    }


    useEffect(() => {
        setCarregando(true);
        if (user?.uid != null) {
            const uid = user?.uid;
            getPostsUIDFirebase(uid, setListaObjetos);
        }
        setCarregando(false);
    }, [user]);

    if (user) {
        return (
            <PostsContext.Provider value={{
                alerta, setAlerta,
                listaObjetos, setListaObjetos,
                remover,
                objeto, setObjeto,
                editarObjeto, novoObjeto, acaoCadastrar,
                handleChange, abreDialogo, setAbreDialogo
            }}>
                <Carregando carregando={carregando}>
                    <Tabela />
                </Carregando>
                <Form />
            </PostsContext.Provider>
        )
    } else {
        return <Navigate to="/" />;
    }

}

export default Manutencao;