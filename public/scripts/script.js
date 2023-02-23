// tinymce.init({
//     selector: 'textarea.my-textarea',
//     branding: false,
//     plugins: "paste",
//     paste_auto_cleanup_on_paste : true,
//     paste_remove_styles: true,
//     paste_remove_styles_if_webkit: true,
//     paste_strip_class_attributes: "all", 
//     forced_root_block : false, 
//     force_br_newlines : true, // tried with and without
//     force_p_newlines : false
// })

// tinymce.init({
//     selector: 'textarea#bookDescription',
//     branding: false,
//     plugins: "paste",
//     paste_auto_cleanup_on_paste : true,
//     paste_remove_styles: true,
//     paste_remove_styles_if_webkit: true,
//     paste_strip_class_attributes: "all", 
//     forced_root_block : false, 
//     force_br_newlines : true, // tried with and without
//     force_p_newlines : false
// })

// tinymce.init({
//     selector: 'textarea#article',
//     branding: false,
//     plugins: "paste",
//     paste_auto_cleanup_on_paste : true,
//     paste_remove_styles: true,
//     paste_remove_styles_if_webkit: true,
//     paste_strip_class_attributes: "all", 
//     forced_root_block : false, 
//     force_br_newlines : true, // tried with and without
//     force_p_newlines : false
// })



// const table = '<p>This table uses features of the non-editable plugin to make the text in the<br><strong>top row</strong> and <strong>left column</strong> uneditable.</p>' +
// '    <table style="width: 60%; border-collapse: collapse;" border="1"> ' +
// '        <caption class="mceNonEditable">Ephox Sales Analysis</caption> ' +
// '       <tbody> ' +
// '          <tr class="mceNonEditable"> ' +
// '                <th style="width: 40%;">&nbsp;</th><th style="width: 15%;">Q1</th> ' +
// '                <th style="width: 15%;">Q2</th><th style="width: 15%;">Q3</th> ' +
// '                <th style="width: 15%;">Q4</th> ' +
// '            </tr> ' +
// '            <tr> ' +
// '                <td class="mceNonEditable">East Region</td> ' +
// '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
// '            </tr> ' +
// '            <tr> ' +
// '                <td class="mceNonEditable">Central Region</td> ' +
// '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
// '            </tr> ' +
// '            <tr> ' +
// '                <td class="mceNonEditable">West Region</td> ' +
// '                <td>100</td> <td>110</td> <td>115</td> <td>130</td> ' +
// '            </tr> ' +
// '        </tbody> ' +
// '    </table>';

// const table2 = '<div> ' +
// '        <p>' +
// '            Templates are a great way to help content authors get started creating content.  You can define the HTML for the template and ' +
// '            then when the author inserts the template they have a great start towards creating content! ' +
// '        </p> ' +
// '        <p> ' +
// '            In this example we create a simple table for providing product details for a product page on your web site.  The headings are ' +
// '            made non-editable by loading the non-editable plugin and placing the correct class on the appropriate table cells. ' +
// '        </p> ' +
// '        <table style="width:90%; border-collapse: collapse;" border="1"> ' +
// '        <tbody> ' +
// '        <tr style="height: 30px;"> ' +
// '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Name:</td><td style="width:60%;">{insert name here}</td> ' +
// '        </tr> ' +
// '        <tr style="height: 30px;"> ' +
// '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Description:</td><td style="width:60%;">{insert description here}</td> ' +
// '        </tr> ' +
// '        <tr style="height: 30px;"> ' +
// '            <th class="mceNonEditable" style="width:40%; text-align: left;">Product Price:</td><td style="width:60%;">{insert price here}</td> ' +
// '        </tr> ' +
// '        </tbody> ' +
// '        </table> ' +
// '    </div> ';

// const textarea = {
//   selector: 'textarea#biography',
//   resize: false,
//   autosave_ask_before_unload: false,
//   powerpaste_allow_local_images: true,
//   plugins: [
//     'a11ychecker', 'advcode', 'advlist', 'anchor', 'autolink', 'codesample', 'fullscreen', 'help',
//     'image', 'editimage', 'tinydrive', 'lists', 'link', 'media', 'powerpaste', 'preview',
//     'searchreplace', 'table', 'template', 'tinymcespellchecker', 'visualblocks', 'wordcount'
//   ],
//   templates: [
//     {
//       title: 'Non-editable Example',
//       description: 'Non-editable example.',
//       content: table
//     },
//     {
//       title: 'Simple Table Example',
//       description: 'Simple Table example.',
//       content: table2
//     }
//   ],
//   toolbar: 'insertfile a11ycheck undo redo | bold italic | forecolor backcolor | template codesample | alignleft aligncenter alignright alignjustify | bullist numlist | link image',
//   spellchecker_dialog: true,
//   spellchecker_ignore_list: ['Ephox', 'Moxiecode'],
//   tinydrive_demo_files_url: '../_images/tiny-drive-demo/demo_files.json',
//   tinydrive_token_provider: (success, failure) => {
//     success({ token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJqb2huZG9lIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.Ks_BdfH4CWilyzLNk8S2gDARFhuxIauLa8PwhdEQhEo' });
//   },
//   content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }'
// };

// tinymce.init(textarea);

// var frmPersonallInfo = document.getElementById('personal-info');
// var frmPublishedBooks = document.getElementById('published-books');
// var frmPublishedArticles = document.getElementById('published-articles');

// var next1 = document.getElementById('Next-I');
// var next2 = document.getElementById('Next-II');
// var back1 = document.getElementById('Back-I');
// var back2 = document.getElementById('Back-II');

// var progressBar = document.getElementById('progress');

// next1.onclick = function(){
//     frmPersonallInfo.style.left = "-450px";
//     frmPublishedBooks.style.left = "40px";
//     progress.style.width = "240px"
// }

// back1.onclick = function(){
//     frmPersonallInfo.style.left = "40px";
//     frmPublishedBooks.style.left = "450px";
//     progress.style.width = "120px"
// }

// next2.onclick = function(){
//     frmPublishedBooks.style.left = "-450px";
//     frmPublishedArticles.style.left = "40px";
//     progress.style.width = "360px"
// }

// back2.onclick = function(){
//     frmPublishedBooks.style.left = "40px";
//     frmPublishedArticles.style.left = "450px";
//     progress.style.width = "240px"
// }


// const multiStepForm = document.querySelector("[data-multi-step]")
// const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
// const progressBar = document.querySelector("#progress");
// console.log("form steps===> ", formSteps);
// let currentStep = formSteps.findIndex(step => {
//   return step.classList.contains("active")
// })

// if (currentStep < 0) {
//   currentStep = 0
//   showCurrentStep()
// }

// multiStepForm.addEventListener("click", e => {
//   let incrementor
//   if (e.target.matches("[data-next]")) {
//     incrementor = 1
//     // progressBar.style.width = "42.5%";
    
    
//   } else if (e.target.matches("[data-previous]")) {
//     incrementor = -1
//     // progressBar.style.width = "21.25%";
//   }

//   if (incrementor == null) return

//   const inputs = [...formSteps[currentStep].querySelectorAll("input")]
//   const allValid = inputs.every(input => input.reportValidity())
//   if (allValid) {
//     currentStep += incrementor
//     showCurrentStep()
//   }
// })

// formSteps.forEach(step => {
//   step.addEventListener("animationend", e => {
//     formSteps[currentStep].classList.remove("hide")
//     e.target.classList.toggle("hide", !e.target.classList.contains("active"))
//   })
// })

// function showCurrentStep() {
//   formSteps.forEach((step, index) => {
//     step.classList.toggle("active", index === currentStep)
//   })
// }

const $searchIcon = document.querySelector('#searchIcon');

$searchIcon.addEventListener('click', () => {
    const $search = document.querySelector('#search');
    $search.classList.toggle('search-is-visible');
});

document.addEventListener('DOMContentLoaded', () => {

  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  // Add a click event on each of them
  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {

      // Get the target from the "data-target" attribute
      const target = el.dataset.target;
      const $target = document.getElementById(target);

      // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
      el.classList.toggle('is-active');
      $target.classList.toggle('is-active');

    });
  });

});


document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });


  // function loadingSpinner(){
  //   let btnLogin = document.querySelector('#login-button');
  //   btnLogin.addEventListener('click', () => {
  //     btnLogin.classList.add('is-loading');
  //   })
  // }

  // loadingSpinner();


  /** multi step form */
  const multiStepForm = document.querySelector("[data-multi-step]")
  const formSteps = [...multiStepForm.querySelectorAll("[data-step]")]
  console.log("form steps===> ", formSteps);
  let currentStep = formSteps.findIndex(step => {
    return step.classList.contains("active")
  })
  
  if (currentStep < 0) {
    currentStep = 0
    showCurrentStep()
  }
  
  multiStepForm.addEventListener("click", e => {
    let incrementor
    if (e.target.matches("[data-next]")) {
      incrementor = 1
      
    } else if (e.target.matches("[data-previous]")) {
      incrementor = -1
    }
  
    if (incrementor == null) return
  
    const inputs = [...formSteps[currentStep].querySelectorAll("input")]
    const allValid = inputs.every(input => input.reportValidity())
    if (allValid) {
      currentStep += incrementor
      showCurrentStep()
    }
  })
  
  formSteps.forEach(step => {
    step.addEventListener("animationend", e => {
      formSteps[currentStep].classList.remove("hide")
      e.target.classList.toggle("hide", !e.target.classList.contains("active"))
    })
  })
  
  function showCurrentStep() {
    formSteps.forEach((step, index) => {
      step.classList.toggle("active", index === currentStep)
    })
  }
