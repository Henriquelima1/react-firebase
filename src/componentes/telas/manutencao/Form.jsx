import { useContext } from "react";
import Alerta from "../../comuns/Alerta";
import PostsContext from "./PostsContext";
import CampoEntrada from "../../comuns/CampoEntrada";
import CampoSelect from "../../comuns/CampoSelect";
import CampoEntradaTexto from "../../comuns/CampoEntradaTexto";
import Dialogo from "../../comuns/Dialogo";
import { MenuItem } from "@mui/material";

function Form() {

    const { objeto, handleChange, acaoCadastrar, alerta, abreDialogo, setAbreDialogo } =
        useContext(PostsContext);

    return (
        <>
            <Dialogo id="modalEdicao" titulo="Organização"
                open={abreDialogo} setOpen={setAbreDialogo}
                acaoCadastrar={acaoCadastrar} idform="formulario"
                maxWidth="sm">
                <Alerta alerta={alerta} />
                <CampoEntrada id="txtID" label="ID"
                    tipo="text" name="id" value={objeto.id}
                    onchange={handleChange} requerido={false}
                    readonly={true} />
                <CampoEntrada id="txtPlaca" label="Placa"
                    tipo="text" name="placa" value={objeto.placa}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={50}
                    msgvalido="Placa OK"
                    msginvalido="Informe a placa" />
                <CampoEntradaTexto id="txtManutencao" label="Manutencao"
                    rows={5}
                    tipo="text" name="manutencao"
                    value={objeto.manutencao}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="Manutencao OK"
                    msginvalido="Informe a manutencao" />
                <CampoEntrada id="txtUrl" label="URL"
                    tipo="text" name="url"
                    value={objeto.url}
                    onchange={handleChange} requerido={true}
                    readonly={false} maxlength={100}
                    msgvalido="URL OK"
                    msginvalido="Informe a URL" />
                <CampoSelect
                    id="selectTipo" label="Tipo"
                    idLabel="labelTipo"
                    tipo="text" name="tipo" value={objeto.tipo}
                    onchange={handleChange} requerido={false}
                    msgvalido="Tipo OK"
                    msginvalido="Informe o Tipo">                    
                    <MenuItem value='Realizada'>Realizada</MenuItem>
                    <MenuItem value='Pendente'>Pendente</MenuItem>
                    <MenuItem value='Finalizada'>Finalizada</MenuItem>                     
                </CampoSelect>
            </Dialogo>
        </>
    )

}

export default Form;