class ListWorkshop:

    def __init__(self):
        # One-dimensional list (size 5)
        self.list1 = ["Java", "Python", "C++", "JavaScript", "Go"]

        # Two-dimensional list (3x3 matrix)
        self.matrix = [
            ["A", "B", "C"],
            ["D", "E", "F"],
            ["G", "H", "I"]
        ]

    # ----------------------------
    # ACCESS ELEMENTS
    # ----------------------------

    def get_second_element(self):
        return self.list1[1]  # index 1 = second element

    def get_second_row_second_column(self):
        return self.matrix[1][1]  # second row, second column

    # ----------------------------
    # INSERTION AND DELETION
    # ----------------------------

    def insert_into_list(self):
        # Insert at position 3 (index 2)
        self.list1.insert(2, "Estructura de datos")

    def delete_third_row_third_column(self):
        # Delete element at third row and third column
        del self.matrix[2][2]

    # ----------------------------
    # SEARCH OPERATIONS
    # ----------------------------

    def search_in_list(self):
        try:
            return self.list1.index("Estructura de datos")
        except ValueError:
            return "No encontrado"

    def search_in_second_row(self, value):
        try:
            return self.matrix[1].index(value)
        except ValueError:
            return "No encontrado"


# ----------------------------
# MAIN PROGRAM
# ----------------------------

if __name__ == "__main__":

    workshop = ListWorkshop()

    print("Segundo elemento de la lista:", workshop.get_second_element())
    print("Elemento de la segunda fila y segunda columna:", workshop.get_second_row_second_column())

    workshop.insert_into_list()
    print("Lista después de insertar:", workshop.list1)

    workshop.delete_third_row_third_column()
    print("Matriz después de eliminar:", workshop.matrix)

    print("Índice de 'Estructura de datos':", workshop.search_in_list())
    print("Búsqueda en la segunda fila (ejemplo 'E'):", workshop.search_in_second_row("E"))
    