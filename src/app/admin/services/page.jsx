import React from "react";
import { listServices } from '@/lib/db'
import { Tabs } from 'antd';
import ServicesTable from "./servicesTable";

export default async function ServicesPage() {

    // Get services
    const services = listServices();

    // Filter services by category
    const digitalServices = services.filter(s => s.category === 'digital');
    const offlineServices = services.filter(s => s.category === 'offline');
    const trainingServices = services.filter(s => s.category === 'training');

    const items = [
        {
            key: '1',
            label: 'Digital services',
            children: <ServicesTable services={digitalServices} />,
        },
        {
            key: '2',
            label: 'Offline services',
            children: <ServicesTable services={offlineServices} />,
        },
        {
            key: '3',
            label: 'Training services',
            children: <ServicesTable services={trainingServices} />,
        },
    ];

    return (
        <div className="mx-auto max-w-4xl">
            <div className="mb-8 flex flex-wrap items-end justify-between gap-3">
                <div>
                    <h1 className="text-2xl font-semibold">Services</h1>
                </div>
                <div className="flex gap-4 text-xs">
                    {/* TODO: Add component */}
                    <p>Add Service</p>
                </div>
            </div>

            {services.length === 0 ? (
                <div className="card-glass rounded-2xl p-10 text-center text-white/55">
                    No services yet.
                </div>
            ) : (
                <div className="card-glass overflow-hidden rounded-2xl">
                    <Tabs defaultActiveKey="1" items={items} className="services-tabs"/>
                    {/* <table className="w-full text-sm">
                        <thead className="bg-white/5 text-left text-xs uppercase tracking-wider text-white/50">
                            <tr>
                                <th className="px-4 py-3">ID</th>
                                <th className="px-4 py-3">Title (English)</th>
                                <th className="px-4 py-3">TItle (Arabic)</th>
                                <th className="px-4 py-3">Body (English)</th>
                                <th className="px-4 py-3">Body (Arabic)</th>
                                <th className="px-4 py-3">Category</th>
                                <th className="px-4 py-3">Order</th>
                                <th className="px-4 py-3">Icon</th>
                                <th className="px-4 py-3">Active</th>
                                <th className="px-4 py-3">Action</th>
                            </tr>
                        </thead>
                        <tbody> */}
                    {/* Iterate through services array */}
                    {/* {services.map((service) => (
                                <ServiceRow key={service.id} service={service} />
                            ))}
                        </tbody>
                    </table> */}
                </div>
            )}
        </div>
    )
}
