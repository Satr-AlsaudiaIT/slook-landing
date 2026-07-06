'use client'

import {React, useState} from 'react'
import ServiceRow from "./service-row";

export default function ServicesTable({ services }) {
    const [editingId, setEditingId] = useState(null);

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-sm">
                <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                    <tr>
                        <th className="px-4 py-3">Order</th>
                        <th className="px-4 py-3">Title (English)</th>
                        <th className="px-4 py-3">Title (Arabic)</th>
                        <th className="px-4 py-3">Body (English)</th>
                        <th className="px-4 py-3">Body (Arabic)</th>
                        <th className="px-4 py-3">Category</th>
                        <th className="px-4 py-3">Icon</th>
                        <th className="px-4 py-3">Active</th>
                        <th className="px-4 py-3">Action</th>
                    </tr>
                </thead>

                <tbody>
                    {services.map((service) => (
                        <ServiceRow
                            key={service.id}
                            service={service}
                            editing={editingId === service.id}
                            setEditing={() => setEditingId(service.id)}
                            stopEditing={() => setEditingId(null)}
                        />
                    ))}
                </tbody>
            </table>
        </div>
    );
}