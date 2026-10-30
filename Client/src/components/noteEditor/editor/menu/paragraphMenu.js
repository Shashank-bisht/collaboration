import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../../ui/select'

function ParagraphMenu({ editor }) {
  const headingLevel = [
    {
      name: 'Paragraph',
      level: 0,
    },
    {
      name: 'Heading 1',
      level: 1,
    },
    {
      name: 'Heading 2',
      level: 2,
    },
    {
      name: 'Heading 3',
      level: 3,
    },
  ]
  const handleHeading = (value) => {
    setTimeout(() => {
      if (value === 0) {
        editor?.chain().focus().setParagraph().run()
        return
      }
      const levelValue = value
      editor?.chain().focus().toggleHeading({ level: levelValue }).run()
    }, 500)
  }

  const levelSelected = editor?.getAttributes('heading')

  return (
    <>
      <Select
        onValueChange={(value) => handleHeading(Number(value))}
        value={`${levelSelected.level ? levelSelected.level : 0}`}
      >
        <SelectTrigger className='w-[120px] focus:outline-none focus:ring-0 focus:ring-offset-0 border-none pr-0'>
          <SelectValue placeholder='Paragraph' />
        </SelectTrigger>
        <SelectContent className='bg-background border-none'>
          {headingLevel.map((item, i) => (
            <SelectItem
              value={`${item.level}`}
              className='capitalize focus:bg-white/[5%] focus:text-white text-white/[60%]'
              key={i}
            >
              {item.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </>
  )
}

export default ParagraphMenu
