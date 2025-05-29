<?php

namespace App\Http\Controllers; 

use App\Models\Reservation;
use App\Models\Transaction;
use App\Models\User;
use App\Models\Customer;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
 
    public function dashboard()
    {
        // Basic reservation stats
        $totalPendingReservations = Reservation::where('status', 'pending')->count();
        $totalConfirmedReservations = Transaction::where('status', 'confirmed')->count();
        $totalCancelledReservations = Transaction::where('status', 'cancelled')->count();
        $totalCompletedReservations = Transaction::where('status', 'completed')->count();

        // User statistics
        $userStats = [
            'total' => User::count(),
            'admin' => User::where('role', 'admin')->count(),
            'user' => User::where('role', 'user')->count(),
            'newThisMonth' => User::whereMonth('created_at', now()->month)->count(),
        ];

        // Time-based reservation statistics
        $today = now()->startOfDay();
        $weekStart = now()->startOfWeek();
        $monthStart = now()->startOfMonth();

        $reservationStats = [
            'today' => Reservation::whereDate('date_time', $today)->count(),
            'thisWeek' => Reservation::whereBetween('date_time', [$weekStart, now()])->count(),
            'thisMonth' => Reservation::whereBetween('date_time', [$monthStart, now()])->count(),
        ];

        // Revenue statistics
        $revenueStats = [
            'today' => Transaction::whereDate('created_at', $today)
                ->where('status', 'completed')
                ->sum('amount'),
            'thisWeek' => Transaction::whereBetween('created_at', [$weekStart, now()])
                ->where('status', 'completed')
                ->sum('amount'),
            'thisMonth' => Transaction::whereBetween('created_at', [$monthStart, now()])
                ->where('status', 'completed')
                ->sum('amount'),
            'total' => Transaction::where('status', 'completed')->sum('amount'),
        ];

        // Popular reservation times (for the past month)
        $popularTimes = Reservation::selectRaw('HOUR(date_time) as hour, COUNT(*) as count')
            ->whereBetween('date_time', [now()->subMonth(), now()])
            ->groupBy('hour')
            ->orderByDesc('count')
            ->limit(5)
            ->get();

        // Table utilization for the past month
        try {
            $tableUtilization = Reservation::selectRaw('tableID, COUNT(*) as usage_count')
                ->whereBetween('date_time', [now()->subMonth(), now()])
                ->groupBy('tableID')
                ->with('table')
                ->get()
                ->filter(function ($reservation) {
                    return $reservation->table !== null;
                })
                ->map(function ($reservation) {
                    return [
                        'table_number' => $reservation->table->table_number,
                        'usage_count' => $reservation->usage_count,
                    ];
                })
                ->values()
                ->all();
        } catch (\Exception $e) {
            $tableUtilization = [];
            \Log::error('Error fetching table utilization: ' . $e->getMessage());
        }

        // Recent activity (last 10 reservations/transactions)
        try {
            $recentActivity = Reservation::with(['customer', 'transaction'])
                ->orderByDesc('created_at')
                ->limit(10)
                ->get()
                ->map(function ($reservation) {
                    return [
                        'id' => $reservation->reservationID,
                        'customer_name' => $reservation->customer ? $reservation->customer->name : 'N/A',
                        'date_time' => $reservation->date_time,
                        'status' => $reservation->transaction ? $reservation->transaction->status : $reservation->status,
                        'amount' => $reservation->transaction ? $reservation->transaction->amount : null,
                        'created_at' => $reservation->created_at,
                    ];
                });
        } catch (\Exception $e) {
            $recentActivity = [];
            \Log::error('Error fetching recent activity: ' . $e->getMessage());
        }

        return Inertia::render('admin_side/admin_dashboard', [
            'totalPendingReservations' => $totalPendingReservations,
            'totalConfirmedReservations' => $totalConfirmedReservations,
            'totalCancelledReservations' => $totalCancelledReservations,
            'totalCompletedReservations' => $totalCompletedReservations,
            'userStats' => $userStats,
            'reservationStats' => $reservationStats,
            'revenueStats' => $revenueStats,
            'popularTimes' => $popularTimes,
            'tableUtilization' => $tableUtilization,
            'recentActivity' => $recentActivity,
        ]);
    }

    public function booking()
    {
        $reservations = Reservation::with(['customer', 'table', 'transaction'])
            ->orderByDesc('created_at')
            ->get();

        $counts = [
            'pending' => Reservation::where('status', 'pending')->count(),
            'confirmed' => Reservation::where('status', 'confirmed')->count(),
            'cancelled' => Reservation::where('status', 'cancelled')->count(),
            'completed' => Reservation::where('status', 'completed')->count(),
        ];

        return Inertia::render('admin_side/admin_booking', [
            'reservations' => $reservations,
            'counts' => $counts,
        ]);
    }

    public function handleReservationAction(Request $request)
    {
        $request->validate([
            'reservationID' => 'required|exists:reservation,reservationID',
            'action' => 'required|in:confirm,cancel',
        ]);

        $reservation = Reservation::with('transaction')->findOrFail($request->reservationID);
        $transaction = $reservation->transaction;

        switch ($request->action) {
            case 'confirm':
                // Update reservation status to 'confirmed' if pending
                if ($reservation->status === 'pending') {
                    $reservation->status = 'confirmed';
                }

                // Update transaction status to 'completed' if currently 'confirmed'
                if ($transaction && $transaction->status === 'confirmed') {
                    $transaction->status = 'completed';
                    $transaction->save();
                }
                break;

            case 'cancel':
                // Update reservation status to 'cancelled'
                $reservation->status = 'cancelled';

                // Update transaction status to 'cancelled' if not failed/refunded
                if ($transaction && !in_array($transaction->status, ['failed', 'refunded'])) {
                    $transaction->status = 'cancelled';
                    $transaction->save();
                }
                break;
        }

        $reservation->save();

        return redirect()->back()->with('success', 'Status updated successfully.');
    }

    public function userlist()
        {
            $users = User::all(); 

        return Inertia::render('admin_side/admin_users', [
            'users' => $users,
        ]);
    }

   public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.userlist')->with('success', 'User deleted successfully.');
    }

    public function update(Request $request, User $user)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username,' . $user->userID . ',userID',
            'email' => 'required|email|max:255|unique:users,email,' . $user->userID . ',userID',
            'role' => 'required|in:user,admin',
        ]);

        $user->update([
            'username' => $request->username,
            'email' => $request->email,
            'role' => $request->role,
        ]);

        return redirect()->back()->with('success', 'User updated successfully.');
    }

    public function store(Request $request)
    {
        $request->validate([
            'username' => 'required|string|max:255|unique:users,username',
            'email' => 'required|email|max:255',
            'password' => 'required|string|min:8',
            'role' => 'required|in:user,admin',
        ]);

        // Create user with all profile information
        User::create([
            'username' => $request->username,
            'email' => $request->email,
            'password' => bcrypt($request->password),
            'role' => $request->role,
            'name' => $request->username, // Using username as initial name
            'phone' => null, // Initialize with null, user can update later
        ]);

        return redirect()->back()->with('success', 'User created successfully.');
    }

    public function index()
    {
        $today = now()->startOfDay();
        $weekStart = now()->startOfWeek();
        $monthStart = now()->startOfMonth();

        // User Statistics
        $userStats = [
            'total' => User::count(),
            'admin' => User::where('role', 'admin')->count(),
            'user' => User::where('role', 'user')->count(),
            'newThisMonth' => User::whereBetween('created_at', [$monthStart, now()])->count(),
        ];

        // Reservation Statistics
        $totalPendingReservations = Reservation::where('status', 'pending')->count();
        $totalConfirmedReservations = Reservation::where('status', 'confirmed')->count();
        $totalCancelledReservations = Reservation::where('status', 'cancelled')->count();
        $totalCompletedReservations = Reservation::where('status', 'completed')->count();

        // Revenue Statistics
        $revenueStats = [
            'today' => Transaction::whereDate('created_at', $today)
                ->where('status', 'completed')
                ->sum('amount'),
            'thisWeek' => Transaction::whereBetween('created_at', [$weekStart, now()])
                ->where('status', 'completed')
                ->sum('amount'),
            'thisMonth' => Transaction::whereBetween('created_at', [$monthStart, now()])
                ->where('status', 'completed')
                ->sum('amount'),
            'total' => Transaction::where('status', 'completed')->sum('amount'),
        ];

        // Recent activity (last 10 reservations/transactions)
        $recentActivity = Reservation::with(['customer', 'transaction'])
            ->orderByDesc('created_at')
            ->limit(10)
            ->get()
            ->map(function ($reservation) {
                return [
                    'id' => $reservation->reservationID,
                    'customer_name' => $reservation->customer ? $reservation->customer->name : 'N/A',
                    'date_time' => $reservation->date_time,
                    'status' => $reservation->transaction ? $reservation->transaction->status : $reservation->status,
                    'amount' => $reservation->transaction ? $reservation->transaction->amount : null,
                ];
            });

        return Inertia::render('admin_side/admin_dashboard', [
            'totalPendingReservations' => $totalPendingReservations,
            'totalConfirmedReservations' => $totalConfirmedReservations,
            'totalCancelledReservations' => $totalCancelledReservations,
            'totalCompletedReservations' => $totalCompletedReservations,
            'userStats' => $userStats,
            'revenueStats' => $revenueStats,
            'recentActivity' => $recentActivity,
        ]);
    }
}