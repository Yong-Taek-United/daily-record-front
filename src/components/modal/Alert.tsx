import Modal, { ModalProps } from '../UI/Modal';
import SvgX from '../../../public/images/x.svg';
interface AlertProps extends ModalProps {}

export default function Alert({ visible, onClose }: AlertProps) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className="w-80 h-52 bg-white rounded-lg px-7 py-4">
        <div className="h-6">
          <button className="absolute right-3 hover:bg-gray-200 rounded-sm w-5 h-5">
            <SvgX className="m-auto" width={14} height={14} />
          </button>
        </div>
        <div
          style={{
            height: 150,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}
        >
          <div>
            <p className="text-xl font-bold text-center">알림</p>
            <div className="my-3">
              <p className="text-center">인증 메일을 전송하였습니다.</p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-full h-10 rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
