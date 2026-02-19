"""
Rocket Launch Control System simulation

"""
class LaunchStage:
    
    def __init__(self, name: str) -> None:
        
        self._name: str = name
        self._is_active: bool = False

    def activate(self) -> None:
        self._is_active = True

    def deactivate(self) -> None:  
        self._is_active = False

    @property
    def name(self) -> str:
        return self._name

    @property
    def is_active(self) -> bool:
        return self._is_active


class StageStack:
   
    def __init__(self) -> None:  
        self._items: list = []

    def push(self, stage: LaunchStage) -> None:
        self._items.append(stage)

    def pop(self) -> LaunchStage | None: 
        if self.is_empty():
            return None
        return self._items.pop()

    def is_empty(self) -> bool:
        return len(self._items) == 0

    def size(self) -> int:
        return len(self._items)

    def activation_order(self) -> list[LaunchStage]:
        return list[LaunchStage](self._items)


class RocketLaunchSystem:
    
    def __init__(self) -> None:  
        self._stage_stack: StageStack = StageStack()

    def add_stage(self, stage: LaunchStage) -> None:   
        self._stage_stack.push(stage)

    def start_launch(self) -> None: 
        for stage in self._stage_stack.activation_order():
            stage.activate()
            print(f"  [ACTIVADO] {stage.name}")

    def abort_launch(self) -> None: 
        print("\n  --- ABORTANDO LANZAMIENTO (secuencia LIFO) ---\n")
        while not self._stage_stack.is_empty():
            stage = self._stage_stack.pop()
            if stage is not None and stage.is_active:
                stage.deactivate()
                print(f"  [DESACTIVADO] {stage.name}")


def main() -> None:
    """Run the rocket launch simulation with a failure scenario."""
    print("=" * 50)
    print("  SISTEMA DE CONTROL DE LANZAMIENTO DE COHETE")
    print("  (Simulación basada en pila LIFO)")
    print("=" * 50)

    system = RocketLaunchSystem()

    # Add stages in launch order (first added = first to activate)
    stages = [
        LaunchStage("Verificación de sistemas"),
        LaunchStage("Pre-encendido"),
        LaunchStage("Etapa 1 - Motores principales"),
        LaunchStage("Etapa 2 - Separación"),
        LaunchStage("Etapa 3 - Órbita"),
    ]
    for stage in stages:
        system.add_stage(stage)

    print("\n  Iniciando secuencia de lanzamiento...\n")
    system.start_launch()

    # Simulate a failure: abort is triggered
    print("\n  ¡ALERTA! Fallo detectado en sensores. Iniciando aborto.\n")
    system.abort_launch()

    print("\n  --- Lanzamiento abortado. Todas las etapas desactivadas. ---")
    print("=" * 50)


if __name__ == "__main__":
    main()
