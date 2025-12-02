  // Student data array
        let students = [];
        // Track if we're editing (-1 means not editing)
        let editingIndex = -1;

        // Load students from localStorage when page loads
        function loadStudents() {
            let saved = localStorage.getItem("studentList");
            if (saved) {
                students = JSON.parse(saved);
            } else {
                students = [];
            }
            displayStudents();
        }

        // Save students to localStorage
        function saveStudents() {
            localStorage.setItem("studentList", JSON.stringify(students));
            displayStudents();
        }

        // Display all students in the list
        function displayStudents() {
            let studentList = document.getElementById("studentList");
            
            // Clear the list completely
            studentList.innerHTML = "";
            
            // If no students, display the empty message
            if (students.length === 0) {
                let emptyMessage = document.createElement("div");
                emptyMessage.className = "empty-message";
                emptyMessage.id = "emptyMessage";
                
                let emptyImage = document.createElement("img");
                emptyImage.src = "empty.png";
                emptyImage.alt = "Empty list";
                emptyImage.className = "empty-image";
                
                let messageText1 = document.createElement("p");
                messageText1.textContent = "Empty list… Did the students run away?";
                
                let messageText2 = document.createElement("p");
                messageText2.textContent = "Hit 'Add New Student' before they disappear forever!";
                
                emptyMessage.appendChild(emptyImage);
                emptyMessage.appendChild(messageText1);
                emptyMessage.appendChild(messageText2);
                
                studentList.appendChild(emptyMessage);
                return;
            }
            
            // Add each student to the list
            for (let i = 0; i < students.length; i++) {
                let student = students[i];
                
                // Create student item container
                let studentItem = document.createElement("div");
                studentItem.className = "student-item";
                studentItem.id = "student-" + i;
                
                // Create student info section
                let studentInfo = document.createElement("div");
                studentInfo.className = "student-info";
                
                let studentName = document.createElement("h3");
                studentName.textContent = student.name;
                
                let studentDetails = document.createElement("p");
                studentDetails.textContent = "Year Level: " + student.grade + " | Section: " + student.section;
                
                studentInfo.appendChild(studentName);
                studentInfo.appendChild(studentDetails);
                
                // Create action buttons
                let studentActions = document.createElement("div");
                studentActions.className = "student-actions";
                
                let editBtn = document.createElement("button");
                editBtn.className = "edit-btn";
                editBtn.textContent = "Edit";
                editBtn.onclick = function() {
                    editStudent(i);
                };
                
                let deleteBtn = document.createElement("button");
                deleteBtn.className = "delete-btn";
                deleteBtn.textContent = "Delete";
                deleteBtn.onclick = function() {
                    deleteStudent(i);
                };
                
                studentActions.appendChild(editBtn);
                studentActions.appendChild(deleteBtn);
                
                // Put everything together
                studentItem.appendChild(studentInfo);
                studentItem.appendChild(studentActions);
                
                // Add to the list
                studentList.appendChild(studentItem);
            }
        }

        // Show the form
        function showForm() {
            document.getElementById("formOverlay").style.display = "flex";
            // Focus on first input
            document.getElementById("studentName").focus();
        }

        // Hide the form
        function hideForm() {
            document.getElementById("formOverlay").style.display = "none";
            editingIndex = -1;
            clearForm();
        }

        // Clear form inputs
        function clearForm() {
            document.getElementById("studentName").value = "";
            document.getElementById("studentGrade").value = "";
            document.getElementById("studentSection").value = "";
            document.getElementById("formTitle").textContent = "Add New Student";
        }

        // Save student (add new or update existing)
        function saveStudent() {
            let name = document.getElementById("studentName").value.trim();
            let grade = document.getElementById("studentGrade").value.trim();
            let section = document.getElementById("studentSection").value.trim();
            
            // Simple validation
            if (name === "" || grade === "" || section === "") {
                alert("Please fill in all fields");
                return;
            }
            
            let student = {
                name: name,
                grade: grade,
                section: section
            };
            
            if (editingIndex === -1) {
                // Add new student
                students.push(student);
                alert("Student added successfully!");
            } else {
                // Update existing student
                students[editingIndex] = student;
                alert("Student updated successfully!");
                editingIndex = -1;
            }
            
            saveStudents();
            hideForm();
        }

        // Edit a student
        function editStudent(index) {
            editingIndex = index;
            let student = students[index];
            
            // Fill form with student data
            document.getElementById("studentName").value = student.name;
            document.getElementById("studentGrade").value = student.grade;
            document.getElementById("studentSection").value = student.section;
            document.getElementById("formTitle").textContent = "Edit Student";
            
            showForm();
        }

        // Delete a student
        function deleteStudent(index) {
            let confirmDelete = confirm("Are you sure you want to delete this student?");
            
            if (confirmDelete) {
                students.splice(index, 1);
                saveStudents();
                alert("Student deleted successfully!");
            }
        }

        // Set up event listeners when page loads
        window.onload = function() {
            loadStudents();
            
            // Add student button
            document.getElementById("addStudentBtn").onclick = function() {
                clearForm();
                showForm();
            };
            
            // Save student button
            document.getElementById("saveStudentBtn").onclick = saveStudent;
            
            // Cancel button
            document.getElementById("cancelBtn").onclick = hideForm;
            
            // Close form button
            document.getElementById("closeFormBtn").onclick = hideForm;
            
            // Close form when clicking outside
            document.getElementById("formOverlay").onclick = function(event) {
                if (event.target === this) {
                    hideForm();
                }
            };
            
            // Handle Enter key in form
            document.addEventListener("keydown", function(event) {
                if (event.key === "Enter" && document.getElementById("formOverlay").style.display === "flex") {
                    saveStudent();
                }
                
                if (event.key === "Escape" && document.getElementById("formOverlay").style.display === "flex") {
                    hideForm();
                }
            });
        };
