#include <iostream>

int variable = 5; // Biến toàn cục

int main() {
    int variable = 10; // Biến cục bộ

    std::cout << "Local variable: " << variable << std::endl;
    std::cout << "Global variable: " << ::variable << std::endl;

    return 0;
}
