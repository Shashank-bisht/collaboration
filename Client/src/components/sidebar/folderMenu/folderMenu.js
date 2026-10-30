import DialogDelete from './deleteFolder'
import CreateFolder from './createFolder'
import SaveFolder from './saveFolder'
import FolderLists from './folderLists'

const FolderMenu: React.FC = () => {
  return (
    <div className='flex flex-col space-y-[8px]'>
      <div className='flex justify-between items-center px-[30px] inactive-text'>
        <p className='text-[14px] font-semibold'>Folders</p>
        <SaveFolder />
      </div>
      <div className='flex flex-col gap-[5px]'>
        <CreateFolder />
        <FolderLists />
      </div>
      <DialogDelete />
    </div>
  )
}

export default FolderMenu
