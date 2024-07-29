import { Button } from "@/components/ui/button"
import ProjectListring from "./ProjectListring"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import UpdateProject from "./UpdateProject"
import { useState } from "react"

const project = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen} >
      {/* modal for editing/adding project details */}
      <div className="flex items-center justify-between bg-black rounded-md p-3">
        <h1 className="text-xl font-semibold text-white">Your Projects</h1>
        <DialogTrigger asChild>
          <Button variant="outline">Add New </Button>
        </DialogTrigger>
      </div>
      <ProjectListring />
      <UpdateProject onClose={handleClose} />
    </Dialog>
  )
}

export default project