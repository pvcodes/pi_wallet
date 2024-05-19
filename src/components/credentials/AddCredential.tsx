import { Credential, CredentialCreateInput } from "@/lib/types/creds"
import { useEffect, useState } from "react"

interface Cred {
    key: string,
    value: string
}

export default function AddCredentials({ handleAddCred }: { handleAddCred: any }) {
    const [cred, setCred] = useState<Cred>({ key: '', value: '' })
    const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>, option: string) => {
        e.preventDefault();
        setCred({ ...cred, [option]: e.target.value })
    }
    return (
        <tr>
            <th></th>
            <td><input type="text" placeholder="new key" className="input w-full outline-none" value={cred.key} onChange={(e) => handleOnChange(e, 'key')} /></td>
            <td><input type="text" placeholder="new value" className="input w-full outline-offset-0" value={cred.value} onChange={(e) => handleOnChange(e, 'value')} /></td>
            <td><button className="btn btn-primary" onClick={(e) => { handleAddCred(e, cred); setCred({ key: '', value: '' }) }}>Add</button></td>
        </tr>
    )
}