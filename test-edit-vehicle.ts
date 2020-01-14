import { step, TestSettings, Until, By, Device, ENV } from '@flood/element'
import * as assert from 'assert'

export const settings: TestSettings = {
	loopCount: -1,
	description: 'Bosssite - Basic LoadTest',
	//device: Device.iPadLandscape,
	userAgent: 'flood-chrome-test',
	clearCache: true,
	disableCache: true,
  screenshotOnFailure: true,
	actionDelay: 10,
	stepDelay: 7,
}

/**
 * Bosssite
 * Version: 1.0
 */
export default () => {

	step('Bosssite: Login Screen', async browser => {
		await browser.visit('https://loadtest.backlotcars.com/bosssite/login')
		let pageTextVerify = By.visibleText("BacklotCars Login")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})

	step('Bosssite: Proceed to Login', async browser => {
    await browser.type(By.id('admin_user_email'), ENV.bosssite_user);
    await browser.type(By.id('admin_user_password'), ENV.bosssite_pass);

    let element = await browser.findElement(By.nameAttr('commit'))
		await element.click()
    

		let pageTextVerify = By.visibleText("Signed in successfully.")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})

	step('Bosssite: Go to vehcile listing', async browser => {
		let lnkVehicle = By.id("vehicles")
		await browser.wait(Until.elementIsVisible(lnkVehicle))
		let element = await browser.findElement(lnkVehicle)
		await element.click()	

		let pageTextVerify = By.visibleText("New Vehicle")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})	


	step('Bosssite: Go to edit vehicle screen', async browser => {

		//let lnkEditVehicle = By.css(".table_actions a:nth-child(2)")
		let lnkEditVehicle = By.linkText("Edit")
		await browser.wait(Until.elementIsVisible(lnkEditVehicle))
		let elements = await browser.findElements(lnkEditVehicle)

		await elements[0].click()	

		let pageTextVerify = By.visibleText("Vehicle details")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})	

	step('Bosssite: Save vehicle with changes', async browser => {

		await browser.type(By.id('vehicle_description'), "Test " + Math.random());

    let element = await browser.findElement(By.nameAttr('commit'))
		await element.click()

		let pageTextVerify = By.visibleText("Vehicle was successfully updated.")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})	

	step('Bosssite: Logout', async browser => {

		let lnkLogout = By.visibleText("Logout")
		await browser.wait(Until.elementIsVisible(lnkLogout))
		let element = await browser.findElement(lnkLogout)
		await element.focus()
		await element.click()	

		//let pageTextVerify = By.visibleText("Thank you. Your order has been received.")
		let pageTextVerify = By.visibleText("You need to log in or sign up before continuing")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})	
}