// export type IAddStaking = {
//   validator: string
//   amount: string
//   callback?: () => void
// }

export type ITransfer = {
  to: string
  amount: string
  callback?: () => void
}
export type ITransferStaking = {
  validatorFrom: string
  amount: string
  validatorTo: string
  callback?: () => void
}
