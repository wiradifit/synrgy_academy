function GroceryModel() {
  const grocery = [];

  function addGrocery(payload) {
    grocery.push(payload);
  }

  function deleteGrocery(index) {
    grocery.splice(index, 1);
  }

  function deleteAllGroceries() {
    grocery.splice(0, grocery.length);
  }
  return { grocery, addGrocery, deleteGrocery, deleteAllGroceries };
}

function TodoApp() {
  console.log("form active");
  const groceryModel = GroceryModel();

  const formAddGrocery = document.querySelector("section#section-belanja-form > form");
  const inputGrocery = document.querySelector("input[name=belanja]");
  const buttonSubmit = document.getElementById("button-submit");

  const groceryItem = document.getElementById("item-belanja");
  const removeAllItem = document.getElementById("remove-all");

  function handleSubmit(e) {
    e.preventDefault();
    console.log("submit");

    const payload = {
      belanja: inputGrocery.value,
    };

    groceryModel.addGrocery(payload);
    renderGroceryItem();
  }

  function renderGroceryItem() {
    console.log("render grocery item");
    const renderGrocery = [];
    for (let i = 0; i < groceryModel.grocery.length; i++) {
      renderGrocery.push(`
            <div class="flex">
                <p>${groceryModel.grocery[i].belanja}</p>
                <span class="flex justify-content-center"> <i class="fa fa-remove remove-item" data-index="${i}"></i></span>
            </div>
        `);
    }

    groceryItem.innerHTML = renderGrocery.join(" ");
    document.querySelectorAll(".remove-item").forEach(function (removeItem) {
      removeItem.onclick = function (event) {
        const indexGrocery = parseInt(event.target.getAttribute("data-index"));

        groceryModel.deleteGrocery(indexGrocery);

        renderGroceryItem();
      };
    });
  }

  function removeAllGroceries() {
    groceryModel.deleteAllGroceries();
    renderGroceryItem();
  }

  formAddGrocery.onsubmit = handleSubmit;
  removeAllItem.onclick = removeAllGroceries;
}

TodoApp();
