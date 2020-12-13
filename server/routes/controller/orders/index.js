const express=require("express")
const OrderController=require("./orders")
const router=express.Router()

router.post("/",OrderController.createOrder)
router.post("/admin/search",OrderController.searchOrders)
router.post("/admin/search/history",OrderController.searchHistory)
router.get("/history",OrderController.getOrdersHistory)
router.get("/processing",OrderController.getOrdersProcessing)
router.get("/:userId",OrderController.getOrdersByUserId)
router.get("/history/:userId",OrderController.getHistoryByUserId)
router.put("/status",OrderController.changeOrderStatus)
module.exports=router