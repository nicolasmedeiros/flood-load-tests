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

const getRandomInt = (max) => Math.floor(Math.random() * Math.floor(max))

/**
 * Bosssite
 * Version: 1.0
 */
export default () => {

	step('Bosssite: Login Screen', async browser => {
		await browser.visit('https://loadtest.backlotcars.com/bosssite/login')
		let pageTextVerify = By.visibleText("Login")
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

	step('Bosssite: Update vehicle', async browser => {

		await browser.type(By.id('vehicle_description'), "Test " + Math.random());

    let element = await browser.findElement(By.nameAttr('commit'))
		await element.click()

		let pageTextVerify = By.visibleText("Vehicle was successfully updated.")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})	 
	
	step('Bosssite: Go to user list and paginate', async browser => {
		let lnkUsers = By.id("users")
		await browser.wait(Until.elementIsVisible(lnkUsers))
		let element = await browser.findElement(lnkUsers)
		await element.click()	

		let pageTextVerify = By.visibleText("Sign In Count")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
		await browser.wait(Until.elementsLocated(By.css('.next > a'), 1))
		
		let nextEl = await browser.findElement(By.css('.next > a'))
		await nextEl.click()	

		await browser.wait(Until.elementIsVisible(pageTextVerify))
		await browser.wait(Until.elementsLocated(By.css('.last > a'), 1))
		nextEl = await browser.findElement(By.css('.last > a'))
		await nextEl.click()	
	})	

	step('Bosssite: Go to user detail page', async browser => {
		let lnkEditVehicle = By.css(".resource_id_link")
		await browser.wait(Until.elementsLocated(lnkEditVehicle, 1))
		let elements = await browser.findElements(lnkEditVehicle)

		await elements[getRandomInt(elements.length - 1)].click()	

		let pageTextVerify = By.visibleText("Edit User")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})	

	step('Bosssite: Logout', async browser => {

		let lnkLogout = By.visibleText("Logout")
		await browser.wait(Until.elementIsVisible(lnkLogout))
		let element = await browser.findElement(lnkLogout)
		await element.focus()
		await element.click()	

		//let pageTextVerify = By.visibleText("Thank you. Your order has been received.")
		let pageTextVerify = By.visibleText("Signed out successfully")
		await browser.wait(Until.elementIsVisible(pageTextVerify))
	})	
}