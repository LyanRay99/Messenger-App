import {
  createMessageStatus,
  getAllMessageStatuses,
  getAllMessageStatusesOfUser,
  updateMessageStatus,
  deleteMessageStatus
} from './messageStatus.service'

const messageStatusService = {
  createMessageStatus,
  getAllMessageStatuses,
  getAllMessageStatusesOfUser,
  updateMessageStatus,
  deleteMessageStatus
}

export default messageStatusService
