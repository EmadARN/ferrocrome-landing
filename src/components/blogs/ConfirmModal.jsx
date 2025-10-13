export default function ConfirmModal({ title, onCancel, onConfirm }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-6 shadow-lg w-96">
        <h3 className="text-lg  mb-4">{title}</h3>
        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 text-sm bg-gray-500 cursor-pointer rounded"
          >
            لغو
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-500 text-sm cursor-pointer text-white rounded"
          >
            حذف
          </button>
        </div>
      </div>
    </div>
  );
}
