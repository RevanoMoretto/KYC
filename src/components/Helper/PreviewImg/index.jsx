import { Modal, Image } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDocImage } from '../../../redux/slice/kyc/action/fetch_doc_image';

const ImagePreview = ({ order_id, doc_code }) => {
    const [previewVisible, setPreviewVisible] = useState(false);
    const [previewImage, setPreviewImage] = useState(null);
    const dispatch = useDispatch();

    const handlePreview = async () => {
        console.log("Clicked preview icon with:", { order_id, doc_code });

        const resultAction = await dispatch(fetchDocImage({ order_id, doc_code }));
        console.log("Dispatch result:", resultAction);

        if (fetchDocImage.fulfilled.match(resultAction)) {
            setPreviewImage(resultAction.payload);
            setPreviewVisible(true);
        } else {
            Modal.warning({
                title: 'Gagal Memuat Gambar',
                content: 'Dokumen tidak tersedia atau gagal dimuat.',
            });
        }
    };

    return (
        <>
            <EyeOutlined onClick={handlePreview} style={{ color: '#1890ff', marginLeft: 8, cursor: 'pointer' }} />
            <Modal
                open={previewVisible}
                footer={null}
                onCancel={() => setPreviewVisible(false)}
                centered
            >
                <Image src={previewImage} alt="Preview Dokumen" width="100%" />
            </Modal>
        </>
    );
};

export default ImagePreview;
