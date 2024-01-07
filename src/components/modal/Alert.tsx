import Modal, { ModalProps } from '../UI/Modal';
import SvgX from '../../../public/images/x.svg';
interface AlertProps extends ModalProps {
  title?: string;
  content: string;
  handleAlertConfirmation?: () => void;
  handleCloseAlert?: () => void;
}

export default function Alert({
  visible,
  onClose,
  title = '알림',
  content,
  handleAlertConfirmation,
  handleCloseAlert,
}: AlertProps) {
  return (
    <Modal visible={visible} onClose={onClose}>
      <div className={`w-80 h-52 bg-white rounded-lg px-7 py-4 `}>
        <div className="h-6">
          <button
            onClick={handleCloseAlert ? handleCloseAlert : onClose}
            className="absolute w-5 h-5 rounded-sm right-3 hover:bg-gray-200"
          >
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
            <p className="text-xl font-bold text-center">{title}</p>
            <div className="my-3">
              <p className="text-center">{content}</p>
            </div>
          </div>

          <button
            onClick={
              handleAlertConfirmation ? handleAlertConfirmation : onClose
            }
            className="w-full h-10 text-white bg-blue-600 rounded-md hover:bg-blue-700"
          >
            확인
          </button>
        </div>
      </div>
    </Modal>
  );
}
