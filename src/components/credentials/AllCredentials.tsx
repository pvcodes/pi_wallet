import { Credential } from "@/lib/types/creds"
import Link from "next/link"
import { useEffect } from "react"
import AddCredential from "./AddCredential"

export default function AllCredentials({ creds, handleDeleteCred, handleAddCred }: { creds: Partial<Credential>[] | undefined, handleDeleteCred: any, handleAddCred: any }) {
    return (
        // <>
        //     ALL CREDS for id: {creds?.length}
        //     {creds?.map(({ id, key, value }) => (
        //         <div key={id}>
        //             Key: {key}, Value: {value ?? 'N/A'}
        //             <button className="btn btn-link" onClick={(e) => handleDeleteCred(e, id)}> delete</button>
        //         </div >
        //     ))
        //     }
        // </>
        <div className="overflow-x-auto">
            <table className="table">
                {/* head */}
                <thead>
                    <tr>
                        <th></th>
                        <th>Key</th>
                        <th>Value</th>
                    </tr>
                </thead>
                <tbody>
                    {creds?.map(({ id, key, value }, index) => (
                        <tr key={id}>
                            <th>{index + 1}</th>
                            <td>{key}</td>
                            <td>{value}</td>
                            {/* <td> */}
                            <td className="dropdown dropdown-end dropdown-hover">
                                <div tabIndex={0} role="button" className="btn btn-ghost p-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                                        <circle cx="12" cy="5" r="2"></circle>
                                        <circle cx="12" cy="12" r="2"></circle>
                                        <circle cx="12" cy="19" r="2"></circle>
                                    </svg>
                                </div>
                                <ul tabIndex={0} className="dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-box w-52">
                                    <li><a onClick={(e) => handleDeleteCred(e, id)}>delete</a></li>
                                    {/* <li><a>Item 2</a></li> */}
                                </ul>
                            </td>

                            {/* </td> */}
                        </tr>
                    ))}
                    <AddCredential handleAddCred={handleAddCred} />

                </tbody>
            </table>
        </div >
    )
}