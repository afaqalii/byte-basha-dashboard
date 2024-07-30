'use client'
import { Button } from "@/components/ui/button"
import { Dialog, DialogTrigger } from "@/components/ui/dialog"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { AppDispatch } from "@/redux/store"
import { resetForm, setEditMode } from "@/redux/traningSlice"
import TrainingListing from "./TrainingListing"

const Training = () => {
  const dispatch = useDispatch<AppDispatch>()
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  return (
    <Dialog open={isOpen} onOpenChange={() => {
      setIsOpen(!isOpen)
      dispatch(setEditMode(false))
    }}>
      {/* modal for editing/adding project details */}
      <div className="flex items-center justify-between bg-black rounded-md p-3">
        <h1 className="text-xl font-semibold text-white">Your Trainings</h1>
        <DialogTrigger asChild>
          <Button onClick={() => dispatch(resetForm())} variant="outline">Add New </Button>
        </DialogTrigger>
      </div>
      <TrainingListing handleClose={handleClose} handleOpen={handleOpen} />
    </Dialog>
  )
}

export default Training