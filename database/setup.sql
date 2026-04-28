-- =============================================
-- Nova Crest Academy: DBMS Core Setup
-- Author: DBMS Project Architect
-- Description: Core schema for school management
-- =============================================

CREATE DATABASE IF NOT EXISTS NovaCrestDB;
USE NovaCrestDB;

-- 1. Students Table
CREATE TABLE IF NOT EXISTS Students (
    StudentID INT PRIMARY KEY AUTO_INCREMENT,
    FirstName VARCHAR(50) NOT NULL,
    LastName VARCHAR(50) NOT NULL,
    Email VARCHAR(100) UNIQUE,
    DOB DATE,
    Gender ENUM('Male', 'Female', 'Other'),
    EnrollmentDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    Status ENUM('Active', 'Alumni', 'Suspended') DEFAULT 'Active'
);

-- 2. Staff (Teachers) Table
CREATE TABLE IF NOT EXISTS Staff (
    StaffID INT PRIMARY KEY AUTO_INCREMENT,
    FullName VARCHAR(100) NOT NULL,
    Department VARCHAR(50),
    Designation VARCHAR(50),
    Email VARCHAR(100) UNIQUE,
    Phone VARCHAR(20)
);

-- 3. Attendance Table
CREATE TABLE IF NOT EXISTS Attendance (
    AttendanceID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    Date DATE NOT NULL,
    Status ENUM('Present', 'Absent', 'Late', 'Excused'),
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);

-- 4. Fees Table
CREATE TABLE IF NOT EXISTS Fees (
    FeeID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    Amount DECIMAL(10, 2) NOT NULL,
    PaymentDate DATE,
    Status ENUM('Paid', 'Pending', 'Partial') DEFAULT 'Pending',
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);

-- 5. Marks/Performance Table
CREATE TABLE IF NOT EXISTS Marks (
    MarkID INT PRIMARY KEY AUTO_INCREMENT,
    StudentID INT,
    Subject VARCHAR(50),
    Score INT CHECK (Score BETWEEN 0 AND 100),
    ExamDate DATE,
    FOREIGN KEY (StudentID) REFERENCES Students(StudentID) ON DELETE CASCADE
);

-- =============================================
-- SAMPLE DATA
-- =============================================

INSERT INTO Students (FirstName, LastName, Email, DOB, Gender) VALUES
('Arav', 'Sharma', 'arav.s@novacrest.edu', '2010-05-15', 'Male'),
('Ishani', 'Verma', 'ishani.v@novacrest.edu', '2011-02-20', 'Female'),
('Kabir', 'Singh', 'kabir.s@novacrest.edu', '2010-11-10', 'Male'),
('Zoya', 'Khan', 'zoya.k@novacrest.edu', '2011-08-05', 'Female');

INSERT INTO Staff (FullName, Department, Designation) VALUES
('Dr. Alok Nath', 'Science', 'Head of Department'),
('Ms. Priya Iyer', 'Mathematics', 'Senior Teacher'),
('Mr. Rohan Das', 'English', 'Lecturer');

INSERT INTO Attendance (StudentID, Date, Status) VALUES
(1, '2026-04-27', 'Present'),
(2, '2026-04-27', 'Present'),
(3, '2026-04-27', 'Absent'),
(4, '2026-04-27', 'Present');

INSERT INTO Fees (StudentID, Amount, Status, PaymentDate) VALUES
(1, 5000.00, 'Paid', '2026-04-01'),
(2, 5000.00, 'Pending', NULL),
(3, 5000.00, 'Partial', '2026-04-10');

INSERT INTO Marks (StudentID, Subject, Score, ExamDate) VALUES
(1, 'Mathematics', 95, '2026-03-15'),
(2, 'Mathematics', 88, '2026-03-15'),
(3, 'Science', 72, '2026-03-16'),
(4, 'Science', 91, '2026-03-16');

-- =============================================
-- DEMONSTRATION QUERIES (FOR MAM)
-- =============================================

-- Query 1: Join Students with Attendance to see daily report
-- SELECT s.FirstName, s.LastName, a.Date, a.Status 
-- FROM Students s 
-- JOIN Attendance a ON s.StudentID = a.StudentID;

-- Query 2: Aggregate - Average score per subject
-- SELECT Subject, AVG(Score) as AverageScore 
-- FROM Marks 
-- GROUP BY Subject;

-- Query 3: Complex - Students with Pending Fees
-- SELECT s.FirstName, s.LastName, f.Amount, f.Status 
-- FROM Students s 
-- JOIN Fees f ON s.StudentID = f.StudentID 
-- WHERE f.Status != 'Paid';
