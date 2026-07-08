'use client'

import { Modal, Form, Input, Select, InputNumber, Switch, message } from 'antd';
import { useLang } from '../../../context/LangContext.jsx';
import { createServiceAction } from '../actions.js';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

const iconOptions = [
    'store',
    'megaphone',
    'share2',
    'globe',
    'heart',
    'mic',
    'palette',
    'filetext',
    'camera',
    'barchart2',
    'tv',
    'partypopper',
    'gift',
    'mappin',
    'graduationcap',
    'briefcase',
];

export default function AddServiceModal({ open, onClose }) {
    const [form] = Form.useForm();
    const { lang } = useLang();
    const router = useRouter();
    const [saving, setSaving] = useState(false);

    const handleFinish = async (values) => {
        try {
            setSaving(true);

            // Create service
            await createServiceAction(values);
            message.success('Service created successfully.');

            form.resetFields();
            onClose();
            router.refresh();
        } catch (err) {
            console.error(err);
            message.error('Failed to create service.');
        } finally {
            setSaving(false);
        }
    };

    const handleClose = () => {
        form.resetFields();
        onClose();
    };

    return (
        <Modal
            centered
            title="Add Service"
            open={open}
            onCancel={handleClose}
            onOk={() => form.submit()}
            okText="Save"
            cancelText="Cancel"
            confirmLoading={saving}
            destroyOnHidden
            className={`service-modal ${lang === 'en' ? 'rtl-modal' : 'ltr-modal'}`} // TODO: change back to 'ar'
        >
            <Form
                form={form}
                layout="vertical"
                onFinish={handleFinish}
                disabled={saving}
            >
                <Form.Item
                    label="English Title"
                    name="title_en"
                    rules={[{
                        required: true,
                        message: 'Please enter the english title'
                    }]}
                >
                    <Input />
                </Form.Item>

                <Form.Item
                    label="Arabic Title"
                    name="title_ar"
                    rules={[{
                        required: true,
                        message: 'Please enter the arabic title'
                    }]}
                >
                    <Input dir="rtl" />
                </Form.Item>

                <Form.Item
                    label="English Description"
                    name="body_en"
                    rules={[{
                        required: true,
                        message: 'Please enter the english description'
                    }]}
                >
                    <Input.TextArea rows={3} />
                </Form.Item>

                <Form.Item
                    label="Arabic Description"
                    name="body_ar"
                    rules={[{
                        required: true,
                        message: 'Please enter the arabic description'
                    }]}
                >
                    <Input.TextArea rows={3} dir="rtl" />
                </Form.Item>

                <Form.Item
                    label="Category"
                    name="category"
                    rules={[{
                        required: true,
                        message: 'Please select a category'
                    }]}
                >
                    <Select
                        options={[
                            { value: 'digital', label: 'Digital' },
                            { value: 'offline', label: 'Offline' },
                            { value: 'training', label: 'Training' },
                        ]}
                    />
                </Form.Item>

                <Form.Item
                    label="Icon"
                    name="icon_slug"
                    rules={[{
                        required: true,
                        message: 'Please select an icon'
                    }]}
                >
                    <Select
                        options={iconOptions.map(icon => ({
                            value: icon,
                            label: icon,
                        }))}
                    />
                </Form.Item>
            </Form>
        </Modal>
    );
}