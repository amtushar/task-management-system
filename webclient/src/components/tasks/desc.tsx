import { Modal } from "antd";

type Props = {
  isVisible: boolean;
  description: string;
  onClose: () => void;
};

const TaskDescriptionModal: React.FC<Props> = ({ isVisible, description, onClose }) => {
  return (
    <Modal
      title="Task Description"
      open={isVisible}
      onCancel={onClose}
      footer={false}
      closeIcon={<span>✖</span>}
    >
      <p>{description || "No description available."}</p>
    </Modal>
  );
};

export default TaskDescriptionModal;
