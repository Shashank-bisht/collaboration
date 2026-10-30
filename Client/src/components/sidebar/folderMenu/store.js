import { create } from 'zustand'

const useFolderStateStore = create((set) => ({
  // init state
  name: 'New Folder',
  isCreateFolder: false,
  isEditFolder: false,
  isOpenDialogDelete: false,

  // state data
  deleteData: {
    folder_id: '',
    name: '',
  },
  updateData: {
    folder_id: '',
    name: '',
  },

  // action
  setName: (name) => set({ name: name }),
  setIsCreate: (status) => set({ isCreateFolder: status }),
  setIsEdit: (status) => set({ isEditFolder: status }),
  setDialogDelete: (status) => set({ isOpenDialogDelete: status }),
  setUpdateData: (data) => set({ updateData: data }),
  setDeleteData: (data) => set({ deleteData: data }),
}))

export function useFolderState() {
  // init state
  const name = useFolderStateStore((state) => state.name)
  const isCreateFolder = useFolderStateStore((state) => state.isCreateFolder)
  const isEditFolder = useFolderStateStore((state) => state.isEditFolder)
  const updateData = useFolderStateStore((state) => state.updateData)
  const deleteData = useFolderStateStore((state) => state.deleteData)
  const isOpenDialogDelete = useFolderStateStore(
    (state) => state.isOpenDialogDelete
  )

  //   state action
  const setIsEdit = useFolderStateStore((state) => state.setIsEdit)
  const setIsCreate = useFolderStateStore((state) => state.setIsCreate)
  const setDialogDelete = useFolderStateStore((state) => state.setDialogDelete)
  const setName = useFolderStateStore((state) => state.setName)
  const setUpdateData = useFolderStateStore((state) => state.setUpdateData)
  const setDeleteData = useFolderStateStore((state) => state.setDeleteData)

  return {
    name,
    isCreateFolder,
    isEditFolder,
    updateData,
    deleteData,
    isOpenDialogDelete,

    setName,
    setIsCreate,
    setIsEdit,
    setUpdateData,
    setDeleteData,
    setDialogDelete,
  }
}
