
const contactForm = document.getElementById('contactForm');
const contactList = document.getElementById('contactList');
const nameInput = document.getElementById('name');
const phoneInput = document.getElementById('phone');
const emailInput = document.getElementById('email');
const contactIndex = document.getElementById('contactIndex');

// Carregar contatos do Local Storage ou inicializar com um array vazio
let contacts = JSON.parse(localStorage.getItem('contacts')) || [];

// Função para exibir a lista de contatos
function renderContacts() {
  contactList.innerHTML = ''; 
  contacts.forEach((contact, index) => {
    const contactItem = document.createElement('li'); 
    contactItem.innerHTML = `
        <span>${contact.name} - ${contact.phone} - ${contact.email}</span> 
        <div class="actions">
        <button onclick="editContact(${index})">Editar</button>
        <button class="delete" onclick="deleteContact(${index})">Excluir</button>
      </div>
    `;
    contactList.appendChild(contactItem);
  });
}

// Função para adicionar ou editar um contato
function addOrUpdateContact(e) {
  e.preventDefault();
  const name = nameInput.value;
  const phone = phoneInput.value;
  const email = emailInput.value;

  const newContact = { name, phone, email };

  const index = contactIndex.value;
  if (index === '') {
    
    contacts.push(newContact);
  } else {
    
    contacts[index] = newContact;
  }

  localStorage.setItem('contacts', JSON.stringify(contacts));

  
  contactForm.reset();
  contactIndex.value = '';
  renderContacts();
}


function editContact(index) {
  const contact = contacts[index];
  nameInput.value = contact.name;
  phoneInput.value = contact.phone;
  emailInput.value = contact.email;
  contactIndex.value = index; 
}


function deleteContact(index) {
  contacts.splice(index, 1); 
  localStorage.setItem('contacts', JSON.stringify(contacts)); 
  renderContacts();}


contactForm.addEventListener('submit', addOrUpdateContact);


renderContacts();
