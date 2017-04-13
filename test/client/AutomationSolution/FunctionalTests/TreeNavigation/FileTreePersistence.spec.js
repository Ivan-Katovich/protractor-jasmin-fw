//todo: make sure these are still valid


/*it('Pressing the Escape key should deselect all previously selected documents', function () {
 webdriverUtils.showNodeChildrenByText('Print', 'folder').then(function () {
 browser.sleep(500);
 fileTree.documentByText('TXT').click();
 expect(fileTree.selectedPages.count()).toBe(1);
 browser.actions().sendKeys(protractor.Key.ESCAPE).perform();
 fileTree.selectedPages.count().then(function (selected) {
 expect(selected).toEqual(0);
 });
 });

 });

 it('Pressing the toggle tree button after selecting one or more docs in the tree should persist the selection when the tree is reopened', function () {
 webdriverUtils.showNodeChildrenByText('Print', 'folder').then(function () {
 browser.sleep(500);
 fileTree.documentByText('TIFF').click();
 expect(fileTree.selectedPages.count()).toBe(1);
 fileTree.selectedPages.getText().then(function (selected) {
 expect(selected).toContain("6/11/2014 TIFF_Multipage_Format");
 fileTree.fileTreeSymbol.click();
 fileTree.fileTreeSymbol.click(); //reopen tree
 expect(fileTree.selectedPages.count()).toBe(1);
 fileTree.selectedPages.getText().then(function (selected) {
 expect(selected).toContain("6/11/2014 TIFF_Multipage_Format");
 });
 });
 });

 });

 it('After selecting one or more documents in the file tree, when the user navigates to another file, the selected documents are no longer selected once the user returns', function () {
 webdriverUtils.showNodeChildrenByText('Print', 'folder').then(function () {
 browser.sleep(500);
 fileTree.documentByText('PDF').click();
 expect(fileTree.selectedPages.count()).toBe(1);
 navigationBar.searchIcon.click().then(function () {
 webdriverUtils.waitTillElementVisible(searchPage.clearResultsButton);
 searchPage.clearResultsButton.click();
 browser.sleep(500).then(function () {
 //Open any file
 searchPage.fileNameSearchBox.clear();
 searchPage.fileNameSearchBox.sendKeys('a8');
 searchPage.searchButton.click();
 navigationBar.openFilesDropdown.click();
 webdriverUtils.waitTillElementVisible(openFilesDropdown.openFileRecord(1));
 webdriverUtils.clickOnElement(openFilesDropdown.openFileRecord(1));
 browser.sleep(500);
 recordHeader.fileNumberRecordHeader.getText().then(function (fileNumber) {
 expect(fileNumber).toBe('NO=>2');
 });
 fileTree.fileTreeSymbol.click(); //reopen tree and verify no selections
 fileTree.selectedPages.count().then(function (selected) {
 expect(selected).toEqual(0);
 });
 });
 });
 });

 });
 */